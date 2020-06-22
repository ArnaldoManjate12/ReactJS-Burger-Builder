import axiosOrders from '../../axios/axiosOrders'
import * as actionTypes from '../actions/actionTypes'


export const purchaseInit = () => {
    return {
        type : actionTypes.PURCHASE_INIT
    }
}

export const purchaseBurgerStart = () => {
    return {
        type : actionTypes.PURCHASE_BURGER_START
    }
}


// asyncronous Order Action creators
export const  purchaseBurger = (orderData , token ) => {
    return dispatch => {
        dispatch( purchaseBurgerStart() )
        axiosOrders.post( "/orders.json?auth=" + token, orderData )
        .then( response => {
            dispatch( purchaseBurgerSuccess(response.data , orderData) )
            dispatch( purchaseInit( ))
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

// Action creators for the Orders page
export const fetchOrders = ( token , userId ) => {
    return dispatch => { 
        dispatch( fetchOrdersStart() )
        const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
        axiosOrders.get( 'orders.json' + queryParams )
        .then( response => {
            // reponse.data = { key{ key : data} , key{ key : data} }
            const orders = [];
            for(let key in response.data){
                orders.push({
                Id :key,
                ...response.data[key]
                });
            }
            dispatch( fetchOrdersSuccess(orders) )
        })
        .catch( err => {
            dispatch( fetchOrdersFail(err) )
        })
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders : orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type : actionTypes.FETCH_ORDER_FAIL,
        error : error
    }
}
