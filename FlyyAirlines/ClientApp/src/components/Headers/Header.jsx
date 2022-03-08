import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/Header/header.css";
import { IsAMobile } from "../../CheckDevice";
import NavMenu from '../NavMenu';
import QuickSearch from './QuickSearch';
const Header = () => {
    const [dropdownMenu, setDropdownMenu] = useState(false);
    return (
        <header className="headerContainer">
            <FontAwesomeIcon icon="fa-solid fa-bars" onClick={() => setDropdownMenu(!dropdownMenu)}></FontAwesomeIcon>
            {dropdownMenu && <NavMenu />}
            {IsAMobile ? <QuickSearch type="mobile" /> :
                <QuickSearch type="standard" />
            }
        </header>
    )
}

export default Header;