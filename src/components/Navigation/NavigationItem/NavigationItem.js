import React from 'react';
import {NavLink} from 'react-router-dom';
import './NavigationItem.css';

// the to prop determins what link has the active property 
// and if the link has that class the styles are activated by the css
const NavigationItem = (props) => (
    <li className="NavigationItem">
        <NavLink to={props.link} exact
                 activeClassName={props.active}>
              {props.children}
        </NavLink>
    </li>
);

export default NavigationItem;