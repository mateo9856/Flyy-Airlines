import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../css/Header/header.css";
import CheckDevice from "../../CheckDevice";
import NavMenu from './NavMenu';
import QuickSearch from './QuickSearch';
import useWindowSize from '../../Hooks/useWindowSize';
const Header = () => {
    const [dropdownMenu, setDropdownMenu] = useState(false);
    const [width, height] = useWindowSize();
    return (
        <header className="headerContainer">
            <FontAwesomeIcon icon="bars" className = "barsIcon" onClick={() => setDropdownMenu(!dropdownMenu)} />
            {dropdownMenu && <NavMenu />}
            {width < 723 ? <QuickSearch type="mobile" /> : <QuickSearch type = "standard" />}
        </header>
    )
}

export default Header;