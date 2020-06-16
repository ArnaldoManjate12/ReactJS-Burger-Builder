import React, { Component } from 'react';
import {Route ,Redirect} from 'react-router-dom';
import * as actions from '../../store/actions/index'
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
            const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null
            summary = (
                <div className="Checkout">
                    {purchaseRedirect}
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
        price : state.burgerBuilder.totalPrice,
        purchased : state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);