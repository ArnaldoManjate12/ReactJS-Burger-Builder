import axiosOrders from '../../axios/axiosOrders'
import * as actionTypes from '../actions/actionTypes'

export const purchaseBurgerStart = () => {
    return {
        type : actionTypes.PURCHASE_BURGER_START
    }
}

// asyncronous Order Action creators
export const  purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch( purchaseBurgerStart() )
        axiosOrders.post( "/orders.json" , orderData )
        .then( response => {
            dispatch( purchaseBurgerSuccess(response.data , orderData) )
        })
        .catch( error => {
            dispatch( purchaseBurgerFail(error) )
        })
    }
}
// syncronous Order action creator
export const purchaseBurgerSuccess = ( id , orderData ) => {
    return {
        type : actionTypes.PURCHASE_BURGER_SUCCESS,
        orderID : id,
        orderData : orderData
    }
}
// sycronous 
export const purchaseBurgerFail = ( error ) => {
    return {
        type : actionTypes.PURCHASE_BURGER_FAIL,
        error : error
    }
}