import * as actionTypes from '../actions/actionTypes'
import { updateObject} from '../utility'

const initialState = {
    loading : false ,
    orders : [],
    purchased : false,
    error : false
}

// just lazy to do the other cases but iv put thi functio here so i remember the idea
const initPurchase = (action , state ) => {
    return updateObject( state , {purchased : false} )
}

const ruducer = ( state = initialState , action ) => {
    switch( action.type ){
        case actionTypes.INIT_PURCHASE: 
            return initPurchase(action , state)
        case actionTypes.PURCHASE_BURGER_START:
            return updateObject( state , {loading : true} )
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = updateObject({...action.orderData},{ id : action.orderID })
            const updatedProperties = { loading : false, purchased : true, orders : state.orders.concat( newOrder )}
            return updateObject( state , updatedProperties )
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObject( state , {loading: false})
        case actionTypes.FETCH_ORDER_START: 
            return updateObject( state , {loading: true})
        case actionTypes.FETCH_ORDER_SUCCESS:  
            return updateObject( state , {loading: false, orders: action.orders})
        case actionTypes.FETCH_ORDER_FAIL: 
            return updateObject( state , {loading: false, orders: action.error})
        default :
            return state
    }
}

export default ruducer