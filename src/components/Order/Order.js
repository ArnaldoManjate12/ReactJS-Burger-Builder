import React, { Component } from 'react';
import './Order.css';

class Order extends Component {

    componentDidMount() {
   
     
    }

    render(){

        let ingredients = []
        for( let key in this.props.ingredients){
          // push an object with custom names { amout : 1, name : 'cheese' }
          ingredients.push({
            name : key,
            amount : this.props.ingredients[key]
          });
        }

        let ingredientOutput = ingredients.map( ig => <span
                                                         key={ig.name}
                                                         className="Ingredients"
                                                         >{ig.name}: {ig.amount}</span>)
        return (
            <div className="Order">
                <p>Ingredients :{ingredientOutput} </p>
                <p>Price : <strong>R {this.props.price}</strong></p>
            </div>
        )
    }
} 

export default Order;