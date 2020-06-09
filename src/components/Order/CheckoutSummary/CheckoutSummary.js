import React from 'react';
import './CheckoutSummary.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import {connect} from 'react-redux'


const CheckoutSummary = (props) => {
    return(
        <div className="CheckoutSummary">
            <h1> We Hope it tastes Good</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingred}/>
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

const mapStateTopProps = state => {
    return {
        ingred : state.ingredients
    }
}
export default connect(mapStateTopProps)(CheckoutSummary);