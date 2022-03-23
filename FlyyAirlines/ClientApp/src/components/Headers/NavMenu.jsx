import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import {NavItem, NavLink } from "reactstrap"
import { Link } from 'react-router-dom';
import { MenuList } from '../../MenuList';
import "../../css/Header/navmenu.css";
import { AppContext } from '../../AppContext';
const NavMenu = () => {
    const [context, setContext] = useContext(AppContext);
    const [tableMenu, setTableMenu] = useState([]);
    useEffect(() => {
        setTableMenu(MenuList.filter(c => (c.permissions.includes("ALL")) || (c.permissions.includes(context.userRole))));
    }, [])

    const CalcPosition = (arr, index) => {
        const CalcArr = Math.floor(arr.length / 2);
        const FirstSide = arr.length - CalcArr;

        return index <= FirstSide ? "blockLeft" : "blockRight";
    }
    //we need 2 div tables with block left or right and must this implement on useEffect (cut one table to 2 if is a pc if no don't to that)
    return (
        <div className="menuLayout">
            <ul className="navMenuList">
                {tableMenu.map((d, index) => (
                    <NavItem className="listClass">
                        <NavLink tag={Link} className={"listItem " + CalcPosition(tableMenu, index)} key={d.id} to={d.to}>
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