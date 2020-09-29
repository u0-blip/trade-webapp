import React from 'react'
import { Button, Grid, Typography, withStyles } from '@material-ui/core';
import RightMenu from './rightMenu';
import SearchBar from './searchBar';
import { Link } from 'react-router-dom';
import logo from '../resources/logo.svg'
import NotificationsDropdown from './notificationDropdown';
import { AccountCircleOutlined } from '@material-ui/icons';
import { Query } from 'react-apollo';
import { GET_SELF_QUERY } from '../App';

const style = (theme) => {
    return {
        ...theme.spread,
        navBar: {
            display: 'flex',
            justifyContent: 'space-between',
            background: 'lightblue',
            alignItems: 'center',
            height: '5rem',
            paddingLeft: '1rem',
            paddingRight: '1rem',
        }
    }
}


function Header(props) {
    const classes = props.classes;

    let userSection;

    userSection = <Query query={GET_SELF_QUERY} fetchPolicy='cache-and-network'>
        {({ error, loading, data }) => {
            if (data) {
                return <>
                    <NotificationsDropdown />
                    <Link to={`/profile/${data.userself.id}`} className={classes.grow} style={{ justifyContent: 'flex-end', display: 'flex', alignItems: 'center' }}>

                        <AccountCircleOutlined />
                        <Typography variant='h5' noWrap className={classes.username}>
                            {data.userself.username}
                        </Typography>
                    </Link>
                </>
            } else {
                return <Grid container style={{
                    width: 'auto',
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    flexGrow: 1,
                }}>
                    <Grid item col>
                        <Link to='/login'>
                            <Button>
                                Login
                        </Button>
                        </Link>
                        <Link to='/signup'>
                            <Button>
                                Signup
                        </Button>

                        </Link>
                    </Grid>
                </Grid>
            }
        }}
    </Query>


    return (
        <nav class="navbar navbar-static-top bg-light-blue" className={classes.navBar}>
            {/* <!-- Sidebar toggle button--> */}
            <div>
                <Link to='/'><img src={logo}></img></Link>
                <RightMenu />
            </div>
            <SearchBar />
            {/* <!-- Notifications: style can be found in dropdown.less --> */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {userSection}
            </div>
        </nav >
    )
}


export default withStyles(style)(Header)
