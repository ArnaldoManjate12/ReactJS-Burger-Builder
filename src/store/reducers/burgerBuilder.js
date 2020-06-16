import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'

const PRICES = {
    cheese : 2.50,
    meat : 14.50,
    salad : 3.50,
    bacon : 7.50
}

const initialState = {
    totalPrice : 4,
    ingredients : [],
    error : null
}

const Reducer = ( state = initialState , action ) => {
    switch( action.type ){
        case actionTypes.ADD_INGREDIENT:
            const updatedProperties = {
                ingredients :{
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                },
                totalPrice : state.totalPrice + PRICES[action.ingredientName] 
            }

            return updateObject(state, updatedProperties)
        case actionTypes.REMOVE_INGREDIENT: 
            const updatedRemoveProperties = {
                ingredients :{
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                },
                totalPrice : state.totalPrice - PRICES[action.ingredientName] 
            }

            return updateObject(state, updatedRemoveProperties)
        case actionTypes.SET_INGREDIENTS :
            const ingredients = {
                salad : action.ingredients.salad,
                cheese : action.ingredients.cheese,
                bacon : action.ingredients.bacon,
                meat : action.ingredients.meat
            }

            const updatedSetProperties = {
                ingredients : ingredients,
                totalPrice : 4,
                error : false
            }

            return updateObject( state ,updatedSetProperties )
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            const updatedErrorProperties = {error : true }
            return updateObject( state , updatedErrorProperties )
        default :
            return state
    }
}

export default Reducer