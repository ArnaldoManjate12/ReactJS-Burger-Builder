import React, { Component } from 'react';
import {Route} from 'react-router-dom';
// components
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';
import {connect} from 'react-redux'
import './Checkout.css';

class Checkout extends Component {

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
 
    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    render(){
        return (
            <div className="Checkout">
                <CheckoutSummary 
                    ingredients={this.props.ingred}
                    checkoutcontinued={this.checkoutContinuedHandler}
                    checkoutcanceled={this.checkoutCanceledHandler} />
                    <div className="ContactDetails">
                        <Route path="/checkout/contact-data" component={ContactData} /> 
                    </div>
            </div>
        );
    }
    
}

const mapStateToProps = state => {
    return {
        igred : state.ingredients,
        price : state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);