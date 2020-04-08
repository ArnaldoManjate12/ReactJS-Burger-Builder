import React from 'react';
import BurgerLogo from '../../UI/Logo/Logo';
import './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <div className="Toolbar">
        <div>Menu</div>
        <BurgerLogo />
        <nav>
            <ul>
                < NavigationItems/>
            </ul>
        </nav>
    </div>
);

export default toolbar;