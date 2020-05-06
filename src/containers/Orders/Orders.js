import React, { Component } from 'react';
import './Orders.css';
// components
import axiosOrders from  '../../axios/axiosOrders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    state = {
      orders : [],
      loading : false,
      error : false
    }

    componentDidMount() {
      this.setState({loading: true})
      // get the orders from the Database
      axiosOrders.get('orders.json')
      .then( response => {
        console.log(response);
        // reponse.data = { key{ key : data} , key{ key : data} }
        const orders = [];
        for(let key in response.data){
          orders.push({
            Id :key,
            ...response.data[key]
          });
        }
        // update orders in state
        console.log("Data that we got from the DB :" ,orders);
        this.setState({orders ,loading: false});
      })
      .catch( err => {
        console.error(err);
        this.setState({loading: false , error :true})
      })
    }

    render(){
        // show spinner while the http request is being made then check length 
        // if no order is returned let the User Know that they can place an Order
        let orders = <h2 className="NoOrders">You have No Orders <br/>Navigate to the Burger Builder screen to place an Order</h2>;
        if( this.state.loading ){
          orders = <Spinner />;
        }else{
          if(this.state.orders.length > 0){
            orders = this.state.orders.map( order =>{
      
              return  <Order 
                        key={order.Id}
                        price={order.Price} 
                        ingredients={order.Ingredients}/> // an object is not a valid childs
            } )
          }
        }
         // hide no Orders message on error
        if(this.state.error) orders = [];
        
        return(
          <div className="Orders">
            {orders}
          </div>
        )
    }
}

export default withErrorHandler(Orders,axiosOrders);