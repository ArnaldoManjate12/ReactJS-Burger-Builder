import React from 'react';
import './CheckoutSummary.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';


const CheckoutSummary = (props) => {
    return(
        <div className="CheckoutSummary">
            <h1> We Hope it tastes Good</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
                buttonclass="Success"  
                clicked={props.checkoutcontinued}>
                Continue
            </Button>
            <Button 
                buttonclass="Danger" 
                clicked={props.checkoutcanceled}>
                Cancel
            </Button>
        </div>
    )
}

export default CheckoutSummary;