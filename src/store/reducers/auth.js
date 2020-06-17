import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initailState = {
    error : null,
    userId : '',
    token : null,
    loading : false,
    redirectPath: '/'
}

const authStart = (state , action) => {
    return updateObject( state , { loading : true } )
}

const authSuccess = ( state , action ) => {
    return updateObject( state , {  token : action.idToken ,
                                    userId: action.userId ,
                                    error: null ,
                                    loading : false } )
}

const authFail = ( state , action ) => {
    return updateObject( state , { error : action.error,loading :false } )
}

const authLogout = ( state , action ) => {
    return updateObject( state , { userId : null , token : null })
}

const authRedirectPath = ( state , action ) => {
    return updateObject( state , { redirectPath : action.redirectPath})
}

// below are all the actionTypes that we check for in this reducer
const reducer = ( state = initailState , action ) => {
    switch( action.type ){
        case actionTypes.AUTH_START: return authStart( state , action )
        case actionTypes.AUTH_SUCCESS : return authSuccess( state , action )
        case actionTypes.AUTH_LOGOUT : return authLogout( state , action )
        case actionTypes.AUTH_FAIL: return authFail( state , action )
        case actionTypes.AUTH_SET_REDIRECT_PATH: return authRedirectPath( state , action )
        default : return state
    }
}

export default reducer