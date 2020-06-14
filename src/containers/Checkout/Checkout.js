import React, { Component } from 'react';
import {Route ,Redirect} from 'react-router-dom';
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
        let summary = <Redirect to='/' />
        if( this.props.ingred ) {
            summary = (
                <div className="Checkout">
                    <CheckoutSummary 
                        ingredients={this.props.ingred}
                        checkoutcontinued={this.checkoutContinuedHandler}
                        checkoutcanceled={this.checkoutCanceledHandler} />
                        <div className="ContactDetails">
                            <Route path="/checkout/contact-data" component={ContactData} /> 
                        </div>
                </div>
            )
        }

        return summary
    }
    
}

const mapStateToProps = state => {
    return {
        ingred : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);