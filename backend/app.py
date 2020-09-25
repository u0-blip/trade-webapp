#!venv/bin/python
import os
from flask import Flask, url_for, redirect, render_template, request, abort
from flask_sqlalchemy import SQLAlchemy
from flask_security import Security, SQLAlchemyUserDatastore, \
    UserMixin, RoleMixin, login_required, current_user
from flask_security.utils import encrypt_password
import flask_admin
from flask_admin.contrib import sqla
from flask_admin import helpers as admin_helpers
from flask_admin import BaseView, expose

from pandas_datareader import data
import datetime
from bokeh.layouts  import column
from bokeh.plotting import figure, show, output_file
from bokeh.embed import components
from bokeh.resources import CDN
from flask import Blueprint
import numpy as np
import pandas_datareader as pdr
import json
import pickle

# Create Flask application
app = Flask(__name__)
app.config.from_pyfile('config.py')
db = SQLAlchemy(app)


# Define models
roles_users = db.Table(
    'roles_users',
    db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
    db.Column('role_id', db.Integer(), db.ForeignKey('role.id'))
)


class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))

    def __str__(self):
        return self.name


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    confirmed_at = db.Column(db.DateTime())
    roles = db.relationship('Role', secondary=roles_users,
                            backref=db.backref('users', lazy='dynamic'))

    def __str__(self):
        return self.email


# Setup Flask-Security
user_datastore = SQLAlchemyUserDatastore(db, User, Role)
security = Security(app, user_datastore)


# Create customized model view class
class MyModelView(sqla.ModelView):

    def is_accessible(self):
        if not current_user.is_active or not current_user.is_authenticated:
            return False

        if current_user.has_role('superuser'):
            return True

        return False

    def _handle_view(self, name, **kwargs):
        """
        Override builtin _handle_view in order to redirect users when a view is not accessible.
        """
        if not self.is_accessible():
            if current_user.is_authenticated:
                # permission denied
                abort(403)
            else:
                # login
                return redirect(url_for('security.login', next=request.url))


    # can_edit = True
    edit_modal = True
    create_modal = True    
    can_export = True
    can_view_details = True
    details_modal = True

class UserView(MyModelView):
    column_editable_list = ['email', 'first_name', 'last_name']
    column_searchable_list = column_editable_list
    column_exclude_list = ['password']
    # form_excluded_columns = column_exclude_list
    column_details_exclude_list = column_exclude_list
    column_filters = column_editable_list


class CustomView(BaseView):
    @expose('/')
    def index(self):
        return self.render('admin/custom_index.html')

# Flask views
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/plot/<stonks>',methods =['GET','POST'])
def plot(stonks):
    stonk_list = stonks.split(' ')

    if len(stonk_list) == 1:
        return plot_candle(stonk_list[0])
    else:
        lines = []
        for s in stonk_list:
            lines.append(plot_trend(s))
        return json.dumps(lines)

stonk_lookup = {
    '^GSPC':'S&P 500',
    'VAS.AX':'VAS',
    '^HSI': 'HSI'
}

def plot_trend(stonk):
    start = datetime.datetime(2020,5,1)
    end = datetime.datetime.today().strftime("%Y/%m/%d")
    # word = request.form['company_ip']

    # df=data.DataReader(name=word,data_source="iex",start=start,end=end, api_key='pk_c88b455c96e54a6b965aa23c1797f5ad')
    df=get_cache_data(stonk, start=start, end=end, interval='d')

    p=figure(x_axis_type='datetime' , sizing_mode='scale_both')
    p.title.text=stonk_lookup[stonk]
    p.grid.grid_line_alpha=0.3

    df["Middle"]=(df.Open+df.Close)/2
    p.line(df.index, df.Middle)
    script1, div1 = components(p)

    return script1 + div1

def get_cache_data(stonk, start, end, interval):
    key = str(stonk) + str(start) + str(end) + str(interval)
    fname = 'stonk_cache.pickle'
    if os.path.exists(fname):
        with open(fname, 'rb') as cache:
            db = pickle.load(cache)
        if key in db:
            return db[key]
        else:
            df=pdr.get_data_yahoo(stonk, start=start, end=end, interval=interval)
            db[key] = df
            with open(fname, 'wb') as cache:
                pickle.dump(db, cache)
            return df
    else:
        db = {}
        df=pdr.get_data_yahoo(stonk, start=start, end=end, interval=interval)
        db[key] = df
        with open(fname, 'wb') as cache:
            pickle.dump(db, cache)
        return df


def plot_candle(stonk):
    start = datetime.datetime(2020,5,1)
    end = datetime.datetime.today().strftime("%Y/%m/%d")
    # word = request.form['company_ip']

    # df=data.DataReader(name=word,data_source="iex",start=start,end=end, api_key='pk_c88b455c96e54a6b965aa23c1797f5ad')

    df=get_cache_data(stonk, start=start, end=end, interval='d')

    def inc_dec(c, o):
        if c > o:
            value="Increase"
        elif c < o:
            value="Decrease"
        else:
            value="Equal"
        return value

    # print('head', df.head())
    # print(len(df))

    df["Status"]=[inc_dec(c,o) for c, o in zip(df.Close,df.Open)]
    df["Middle"]=(df.Open+df.Close)/2
    df["Height"]=abs(df.Close-df.Open)

    p=figure(x_axis_type='datetime' , sizing_mode='stretch_both')
    p.title.text=stonk
    p.grid.grid_line_alpha=0.3

    hours_12=12*60*60*1000

    p.segment(df.index, df.High, df.index, df.Low, color="Black")

    p.rect(df.index[df.Status=="Increase"],df.Middle[df.Status=="Increase"],
           hours_12, df.Height[df.Status=="Increase"],fill_color="#CCFFFF",line_color="black")

    p.rect(df.index[df.Status=="Decrease"],df.Middle[df.Status=="Decrease"],
           hours_12, df.Height[df.Status=="Decrease"],fill_color="#FF3333",line_color="black")

    mv_avg = df.Middle.rolling(5).sum()/5

    p.line(df.index, mv_avg)

    p1=figure(x_axis_type='datetime' , sizing_mode='stretch_both')
    p1.title.text='volume (x10^4)'
    
    p1.vbar(x=df.index, top=df.Volume/1e5, width=0.9)

    script1, div1 = components(p)
    
    script2, div2 = components(p1)

    all_plot = json.dumps([script1 + div1, script2 + div2])

    # cdn_js=CDN.js_files[0]
    # cdn_css=CDN.css_files[0]
    # predicted = predict_prices(df.Middle[-10:].values.reshape(-1, 1), np.expand_dims(np.arange(29), 1))
    # print(predicted)
    # print(predicted, script1, div1, cdn_js)
    return all_plot


def predict_prices(prices,x):
    from sklearn.svm import SVR
    import numpy as np
    
    dates = list(range(len(prices)))
    dates = np.reshape(dates,(len(dates),1))
    svr_rbf = SVR(kernel = 'rbf',C=1e3,gamma=0.1)
    svr_rbf.fit(dates,prices)

    return svr_rbf.predict(x)[0]


# Create admin
admin = flask_admin.Admin(
    app,
    'My Dashboard',
    base_template='my_master.html',
    template_mode='bootstrap3',
)

# Add model views
admin.add_view(MyModelView(Role, db.session, menu_icon_type='fa', menu_icon_value='fa-server', name="Roles"))
admin.add_view(UserView(User, db.session, menu_icon_type='fa', menu_icon_value='fa-users', name="Users"))
admin.add_view(CustomView(name="Custom view", endpoint='custom', menu_icon_type='fa', menu_icon_value='fa-connectdevelop',))

# define a context processor for merging flask-admin's template context into the
# flask-security views.
@security.context_processor
def security_context_processor():
    return dict(
        admin_base_template=admin.base_template,
        admin_view=admin.index_view,
        h=admin_helpers,
        get_url=url_for
    )

def build_sample_db():
    """
    Populate a small db with some example entries.
    """

    import string
    import random

    db.drop_all()
    db.create_all()

    with app.app_context():
        user_role = Role(name='user')
        super_user_role = Role(name='superuser')
        db.session.add(user_role)
        db.session.add(super_user_role)
        db.session.commit()

        test_user = user_datastore.create_user(
            first_name='Admin',
            email='admin',
            password=encrypt_password('admin'),
            roles=[user_role, super_user_role]
        )

        first_names = [
            'Harry', 'Amelia', 'Oliver', 'Jack', 'Isabella', 'Charlie', 'Sophie', 'Mia',
            'Jacob', 'Thomas', 'Emily', 'Lily', 'Ava', 'Isla', 'Alfie', 'Olivia', 'Jessica',
            'Riley', 'William', 'James', 'Geoffrey', 'Lisa', 'Benjamin', 'Stacey', 'Lucy'
        ]
        last_names = [
            'Brown', 'Smith', 'Patel', 'Jones', 'Williams', 'Johnson', 'Taylor', 'Thomas',
            'Roberts', 'Khan', 'Lewis', 'Jackson', 'Clarke', 'James', 'Phillips', 'Wilson',
            'Ali', 'Mason', 'Mitchell', 'Rose', 'Davis', 'Davies', 'Rodriguez', 'Cox', 'Alexander'
        ]

        for i in range(len(first_names)):
            tmp_email = first_names[i].lower() + "." + last_names[i].lower() + "@example.com"
            tmp_pass = ''.join(random.choice(string.ascii_lowercase + string.digits) for i in range(10))
            user_datastore.create_user(
                first_name=first_names[i],
                last_name=last_names[i],
                email=tmp_email,
                password=encrypt_password(tmp_pass),
                roles=[user_role, ]
            )
        db.session.commit()
    return

if __name__ == '__main__':

    # Build a sample db on the fly, if one does not exist yet.
    app_dir = os.path.realpath(os.path.dirname(__file__))
    database_path = os.path.join(app_dir, app.config['DATABASE_FILE'])
    if not os.path.exists(database_path):
        build_sample_db()

    # Start app
    app.run(host='localhost', debug=False, port=25531)