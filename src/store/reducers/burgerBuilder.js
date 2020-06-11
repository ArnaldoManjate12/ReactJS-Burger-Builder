import * as actionTypes from '../actions/actionTypes';

const PRICES = {
    cheese : 2.50,
    meat : 14.50,
    salad : 3.50,
    bacon : 7.50
}

const initialState = {
    totalPrice : 4,
    ingredients : {
        cheese : 0 ,
        meat : 0 ,
        salad : 0 ,
        bacon : 0
    }
}

const Reducer = ( state = initialState , action ) => {
    switch( action.type ){
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                // how to overwrite one of the properties we just copied from state
                ingredients :{
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                },
                totalPrice : state.totalPrice + PRICES[action.ingredientName] 
               
            }
        case actionTypes.REMOVE_INGREDIENT: 
            console.log(" Removing Ingredient")
            return {
                ...state,
                // how to overwrite one of the properties we just copied from state
                ingredients :{
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                },
                totalPrice : state.totalPrice - PRICES[action.ingredientName]
               
            }
        default :
            return state
    }
}

export default Reducer