import React from 'react'
import { withStyles } from '@material-ui/core';
import RightMenu from './rightMenu';
import SearchBar from './searchBar';
import { Link } from 'react-router-dom';
import logo from '../resources/logo.svg'
import NotificationsDropdown from './notificationDropdown';

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
    return (
        <nav class="navbar navbar-static-top bg-light-blue" className={classes.navBar}>
            {/* <!-- Sidebar toggle button--> */}
            <div>
                <Link to='/'><img src={logo}></img></Link>
                <RightMenu />
            </div>
            <SearchBar />
            {/* <!-- Notifications: style can be found in dropdown.less --> */}
            <NotificationsDropdown />
        </nav >
    )
}


export default withStyles(style)(Header)
