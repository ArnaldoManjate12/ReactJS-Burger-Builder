import * as actionTypes from './actionTypes'
import axios from 'axios'

export const addIngredient = (value) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName : value
    }
}

export const removeIngredient = (value) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName : value
    }
}

export const fetchIngredientsFailed = (message) => {
    return {
        type : actionTypes.FETCH_INGREDIENTS_FAILED,
        errorMessage : message
    }
}

export const setIngredients = (ingredients) => {
    return {
        type : actionTypes.SET_INGREDIENTS,
        ingredients : ingredients
    }
}
// asycronous Ingredient action creator
export const initIngredients = () => {
    return dispatch  => {
        axios.get('https://react-burger-bead9.firebaseio.com/ingredients.json')
        .then( response => {
            dispatch( setIngredients(response.data) )
        })
        .catch( error => {
            dispatch( fetchIngredientsFailed(error) )
        })
    }
}
