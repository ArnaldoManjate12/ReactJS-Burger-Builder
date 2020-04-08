import React from  'react';
import BurgerLogo from '../../../assests/images/burger-logo.png';
import './Logo.css';

const logo = (props) => (
    <div className="BurgerLogo">
        <img src={BurgerLogo} alt="BurgerLogo" />
    </div>
);

export default logo;