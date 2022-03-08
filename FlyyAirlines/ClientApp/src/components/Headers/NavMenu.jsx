import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {NavItem, NavLink } from "reactstrap"
import { Link } from 'react-router-dom';
import { MenuList } from '../../MenuList';
import "../css/Header/navmenu.css";
const Header = () => {//think to get perms
    return (
        <div className="menuLayout">
            <ul>
                {MenuList.map(d => (
                    <NavItem>
                        <NavLink tag ={Link} className = "listItem" key={d.id}>
                         <FontAwesomeIcon icon={d.icon} />
                        {d.name}
                         </NavLink>
                     </NavItem>
                ))}
            </ul>
        </div>
    )
}

export default Header;