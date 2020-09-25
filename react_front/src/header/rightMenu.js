import React, { Component } from 'react'
import $ from 'jquery';
import { withStyles } from '@material-ui/core';
import TocIcon from '@material-ui/icons/Toc';

const style = (theme) => {
  return {
    ...theme.spread,
    mainSidebar: {
    }
  }
}
export class RightMenu extends Component {
  state = {
    expanded: false
  }
  offcanvas = (e) => {
    e.preventDefault();

    this.setState({ ...this.state, expanded: !this.state.expanded })
    const classes = this.props.classes;

    //Enable sidebar push menu
    if ($(window).width() > (classes.screenSizes.sm - 1)) {
      if ($("body").hasClass('sidebar-collapse')) {
        $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
      } else {
        $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
      }
    }
    //Handle sidebar push menu for small screens
    else {
      if ($("body").hasClass('sidebar-open')) {
        $("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
      } else {
        $("body").addClass('sidebar-open').trigger('expanded.pushMenu');
      }
    }
  }


  expandOnHover = () => {
    var _this = this;
    var screenWidth = $.AdminLTE.options.screenSizes.sm - 1;
    //Expand sidebar on hover
    $('.main-sidebar').hover(function () {
      if ($('body').hasClass('sidebar-mini')
        && $("body").hasClass('sidebar-collapse')
        && $(window).width() > screenWidth) {
        _this.expand();
      }
    }, function () {
      if ($('body').hasClass('sidebar-mini')
        && $('body').hasClass('sidebar-expanded-on-hover')
        && $(window).width() > screenWidth) {
        _this.collapse();
      }
    });
  }
  expand = () => {
    $("body").removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
  }
  collapse = () => {
    if ($('body').hasClass('sidebar-expanded-on-hover')) {
      $('body').removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
    }
  }

  render() {
    const classes = this.props.classes;

    let expandButton = <a
      style={{}}
      onClick={(e) => {
        this.offcanvas(e)
      }}
      role="button">
      <TocIcon />
    </a>

    let placeHolder = <div style={{ width: '24px' }} />
    return (
      <>
        { this.state.expanded ? <> {placeHolder} <aside class="main-sidebar" style={{
          background: 'lightgray',
          paddingTop: '27px'
        }}>
          {expandButton}
          <section class="sidebar">
            {/* <!-- Sidebar user panel --> */}
            <div class="user-panel">
              <div class="pull-left image">
                <i class="fa fa-user-circle" style={{ color: 'white', fontSize: '2.5em', }}></i>
              </div>
              <div class="pull-left info">
                <p>
                  {/* {% if current_user.first_name -%}
             {{ current_user.first_name }}
             {% else -%}
             {{ current_user.email }}
             {%- endif %} */}
                </p>
                <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
              </div>
            </div>

            <ul class="sidebar-menu">
              <li class="header">MAIN NAVIGATION</li>
              {/* {% block main_menu %}
        {{ layout.menu() }}
        {% endblock %} */}
              <li>
                <a href="#">
                  <i class="fa fa-envelope"></i> <span>Mailbox</span>
                  <span class="pull-right-container">
                    <small class="label pull-right bg-yellow">12</small>
                    <small class="label pull-right bg-green">16</small>
                    <small class="label pull-right bg-red">5</small>
                  </span>
                </a>
              </li>
              <li class="treeview">
                <a href="#">
                  <i class="fa fa-share"></i> <span>Multilevel</span>
                  <span class="pull-right-container">
                    <i class="fa fa-angle-left pull-right"></i>
                  </span>
                </a>
                <ul class="treeview-menu">
                  <li><a href="#"><i class="fa fa-circle-o"></i> Level One</a></li>
                  <li>
                    <a href="#"><i class="fa fa-circle-o"></i> Level One
                <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                      </span>
                    </a>
                    <ul class="treeview-menu">
                      <li><a href="#"><i class="fa fa-circle-o"></i> Level Two</a></li>
                      <li>
                        <a href="#"><i class="fa fa-circle-o"></i> Level Two
                    <span class="pull-right-container">
                            <i class="fa fa-angle-left pull-right"></i>
                          </span>
                        </a>
                        <ul class="treeview-menu">
                          <li><a href="#"><i class="fa fa-circle-o"></i> Level Three</a></li>
                          <li><a href="#"><i class="fa fa-circle-o"></i> Level Three</a></li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li><a href="#"><i class="fa fa-circle-o"></i> Level One</a></li>
                </ul>
              </li>
            </ul>
          </section>
          {/* <!-- /.sidebar --> */}
        </aside>
        </> : expandButton}
      </>)
  }
}

export default withStyles(style)(RightMenu)
