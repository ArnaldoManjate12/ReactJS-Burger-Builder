import React from 'react';
import './NavigationItem.css';


const NavigationItem = (props) => (
    <li className="NavigationItem">
        <a href="#" className={ props.active ? "NavigationItem.active": null}>{props.children}</a>
    </li>
);

export default NavigationItem;