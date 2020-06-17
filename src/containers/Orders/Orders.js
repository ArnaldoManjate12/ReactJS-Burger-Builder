import React, { Component } from 'react';
import './Orders.css';
// components
import axiosOrders from  '../../axios/axiosOrders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'

class Orders extends Component {
    state = {
      // orders : [],
      // loading : false,
      // error : false
    }

    componentDidMount() {
      console.log(this.props)
      // get the orders from the Database
      this.props.onFetchOrders(this.props.token)
    }

    render(){
        // show spinner while the http request is being made then check length 
        // if no order is returned let the User Know that they can place an Order
        let orders = <h2 className="NoOrders">You have No Orders <br/>Navigate to the Burger Builder screen to place an Order</h2>;
        if( this.props.loading ){
          orders = <Spinner />;
        }else{
          if(this.props.orders.length > 0){
            orders = this.props.orders.map( order => {
              return  <Order 
                        key={order.createDate}
                        price={order.price} 
                        ingredients={order.ingredients}/> // an object is not a valid childs
            } )
          }
        }
         // hide no Orders message on error
        if(this.props.error) orders = [];
        
        return(
          <div className="Orders">
            {orders}
          </div>
        )
    }
}

const mapStateToProps = state => {
  return {
    orders : state.order.orders,
    error : state.order.error,
    loading : state.order.loading,
    token : state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders : (token) => dispatch( actions.fetchOrders(token) )
  }
}

export default connect( mapStateToProps ,mapDispatchToProps )(withErrorHandler(Orders,axiosOrders));