import { faBell, faExclamationTriangle, faShoppingCart, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core';
import RightMenu from './rightMenu';
import SearchBar from './searchBar';


const style = (theme) => {
    return {
        ...theme.spread,
        navBar: {
            display: 'flex',
            justifyContent: 'space-between',
            background: 'lightblue',
            alignItems: 'center',
            height: '5rem',
        }
    }
}
function NotificationsDropdown(props) {
    const ITEM_HEIGHT = 48;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (<>
        <a href="#" onClick={handleClick} style={{ paddingRight: '20px' }}>
            <FontAwesomeIcon icon={faBell} />
            <span class="label label-warning">10</span>
        </a>
        <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '450px'
                },
            }}
        >
            <li class="header">You have 10 notifications</li>
            <li>
                {/* <!-- inner menu: contains the actual data --> */}
                <ul class="menu">
                    <MenuItem onClick={handleClose} key='delete'>
                        <a href="#">
                            <FontAwesomeIcon icon={faUsers} /> 5 new members joined today
                          </a>
                    </MenuItem>
                    <MenuItem onClick={handleClose} key='new'>
                        <a href="#">
                            <FontAwesomeIcon icon={faUser} /> 5 new members joined
                          </a>
                    </MenuItem>
                    <MenuItem onClick={handleClose} key='sale'>
                        <a href="#">
                            <FontAwesomeIcon icon={faShoppingCart} /> 25 sales made
                          </a>
                    </MenuItem>
                    <MenuItem onClick={handleClose} key='username'>
                        <a href="#">
                            <FontAwesomeIcon icon={faUser} /> You changed your username
                          </a>
                    </MenuItem>
                </ul>
            </li>
            <li class="footer"><a href="#">View all</a></li>

        </Menu>

    </>
    )
}

function Header(props) {
    const classes = props.classes;
    return (
        <nav class="navbar navbar-static-top bg-light-blue" className={classes.navBar}>
            {/* <!-- Sidebar toggle button--> */}
            <RightMenu />
            <SearchBar />
            {/* <!-- Notifications: style can be found in dropdown.less --> */}
            <NotificationsDropdown />
        </nav >
    )
}


export default withStyles(style)(Header)
