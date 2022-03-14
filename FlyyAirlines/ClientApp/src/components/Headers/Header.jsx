import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../css/Header/header.css";
import CheckDevice from "../../CheckDevice";
import NavMenu from './NavMenu';
import QuickSearch from './QuickSearch';
const Header = () => {
    const [dropdownMenu, setDropdownMenu] = useState(false);
    return (
        <header className="headerContainer">
                <FontAwesomeIcon icon="bars" onClick={() => setDropdownMenu(!dropdownMenu)} />
            {dropdownMenu && <NavMenu />}
            {CheckDevice.isAMobile() ? <QuickSearch type="mobile" /> :
                <QuickSearch type="standard" />
            }
        </header>
    )
}

export default Header;