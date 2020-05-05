import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import './Checkout.css';

class Checkout extends Component {
    state = {
        ingredients : {
            meat : 2,
            cheese : 1,
            salad: 1,
            bacon : 1
        }
    }

    componentDidMount() {
        
        const query = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        // convert Arrat to Object to store in state
        for(let param of query.entries()){
            // data from: ['salad': 2]
            console.log(param);
            ingredients[param[0]] = +param[1]; // convert to an int
        }
        this.setState({ingredients: ingredients});
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/contact-data');
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
            </div>
        );
    }
    
}

export default Checkout;