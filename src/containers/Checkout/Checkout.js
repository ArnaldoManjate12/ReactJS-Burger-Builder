import React, { Component } from 'react';
import {Route} from 'react-router-dom';
// components
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';
import './Checkout.css';

class Checkout extends Component {
    state = {
        ingredients : {},
        price : 0,
        loading : false,
        purchased : false,
        showAlert : false
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        let price = 0;
        // convert Array to Object and assign price
        for(let param of query.entries()){
            // param : ['salad': '2']
            if( param[0] === 'price' ){
                price  = +param[1]; // assign the price
            } else {
                ingredients[param[0]] = +param[1];// convert value to an int
            }
        }
        // set State with price and ingredients from the url params
        console.log(ingredients , price)
        this.setState({ingredients , price});
    }

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
                    ingredients={this.state.ingredients}
                    checkoutcontinued={this.checkoutContinuedHandler}
                    checkoutcanceled={this.checkoutCanceledHandler} />
                    <div className="ContactDetails">
                        <Route path="/checkout/contact-data" render={ (props) => <ContactData 
                                                                                    postorder={this.PostOrder}
                                                                                    ingredients={this.state.ingredients}
                                                                                    price={this.state.price}
                                                                                    {...props} /> 
                                                                    } 
                        />
                    </div>
            </div>
        );
    }
    
}

export default Checkout;