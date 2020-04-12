import React from 'react';
import BurgerLogo from '../../UI/Logo/Logo';
import SideDrawerToggle from '../SideDrawer/SideDrawerToggle/SideDrawerToggle';
import NavigationItems from '../NavigationItems/NavigationItems';
import './Toolbar.css';

const toolbar = (props) => (
    <div className="Toolbar">
        <SideDrawerToggle clicked={props.showdrawer}/>
        <div className="ToolBarLogo">
            <BurgerLogo />
        </div>
        <nav className="DesktopOnly">
            <ul>
                <NavigationItems/>
            </ul>
        </nav>
    </div>
);

export default toolbar;