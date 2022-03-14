import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import {NavItem, NavLink } from "reactstrap"
import { Link } from 'react-router-dom';
import { MenuList } from '../../MenuList';
import "../../css/Header/navmenu.css";
import { AppContext } from '../../AppContext';
const NavMenu = () => {
    const [context, setContext] = useContext(AppContext);
    return (
        <div className="menuLayout">
            <ul>
                {MenuList.filter(c => (c.permissions.includes("ALL")) || (c.permissions.includes(context.userRole))).map(d => (
                    <NavItem className = "listClass">
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

export default NavMenu;