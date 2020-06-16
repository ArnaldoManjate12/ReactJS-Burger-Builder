import * as actionTypes from '../actions/actionTypes'
import axois from 'axios'

export const Authenticate = ( email , password , isSignUp ) => {
    return dispatch => {
        dispatch( AuthStart() )
        const authData = {
            email,
            password,
            returnSecureToken : true
        }
        // conditional URL 
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvvRz3czE_pcBGVwjFeN8q3CoRVii4SYY"
        if( !isSignUp ) url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAvvRz3czE_pcBGVwjFeN8q3CoRVii4SYY"
        // authenticate
        axois.post( url , authData )
        .then( response => {
            console.log(response)
            dispatch( CheckAuthTimeout( response.data.expiresIn ) )
            dispatch( AuthSuccess(response.data.idToken , response.data.localId) )
        } )
        .catch( error => {
            console.log(error)
            dispatch( AuthFail(error.response.data.error) )
        })
    }
}

const Logout = ( token , userId ) => {
    return {
        type : actionTypes.AUTH_LOGOUT,
    }
}

export const CheckAuthTimeout = ( timePeriod ) => {
    return dispatch => {
            setTimeout(  
                () => dispatch( Logout() ) 
                , timePeriod * 1000)
        } 
}

const AuthStart = () => { 
    return {
        type : actionTypes.AUTH_START
    }
}

const AuthSuccess = ( idToken , userId ) => { 
    return {
        type : actionTypes.AUTH_SUCCESS,
        userId : userId,
        idToken : idToken
    }
}

const AuthFail = ( error ) => { 
    return {
        type : actionTypes.AUTH_FAIL,
        error : error
    }
}