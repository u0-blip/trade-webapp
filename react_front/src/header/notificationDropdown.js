import { faBell, faShoppingCart, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { } from 'react'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

export default function NotificationsDropdown(props) {
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
        <a onClick={handleClick} style={{ paddingRight: '20px' }}>
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
                        <Link to='/'>
                            <FontAwesomeIcon icon={faUsers} /> 5 new members joined today
                          </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose} key='new'>
                        <Link to='/'>
                            <FontAwesomeIcon icon={faUser} /> 5 new members joined
                          </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose} key='sale'>
                        <Link to='/'>
                            <FontAwesomeIcon icon={faShoppingCart} /> 25 sales made
                          </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose} key='username'>
                        <Link to='/'>
                            <FontAwesomeIcon icon={faUser} /> You changed your username
                          </Link>
                    </MenuItem>
                </ul>
            </li>
            <li class="footer"><Link to='/'>View all</Link></li>

        </Menu>

    </>
    )
}