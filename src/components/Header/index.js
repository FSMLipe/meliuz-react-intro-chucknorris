import React from "react";
import {
    Menu
} from '@chakra-ui/react';
import Logo from '../../assets/logo.jpg';

const Header = () => {
    return(
        <nav>
            <img src={Logo} className="logo" alt="Logo" />
            <Menu>
                
            </Menu>
        </nav>
    )
}

export default Header;