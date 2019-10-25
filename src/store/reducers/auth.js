import * as actionTypes from '../actions/actionTypes';

const initialState = {
    authData: {
        email: null,
        displayName: null,
        idToken: null,
        registered: false,
        refreshToken: null,
        id: null,
    },
    error: null,
    loading: false,
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state)
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actionTypes.AUTH_FAIL: return authFail(state, action)
        case actionTypes.AUTH_LOGOUT: return authLogout(state)
        case actionTypes.AUTH_CLEAR_ERROR: return authClearError(state)

        default: return state;
    }
}

const authStart = (state) => {
    return {
        ...state,
        loading: true,
        error: null,
    };
}

const authSuccess = (state, action) => {
    return {
        ...state,
        authData: {
            ...state.authData,
            email: action.authData.email,
            displayName: action.authData.displayName,
            idToken: action.authData.idToken,
            registered: action.authData.registered,
            refreshToken: action.authData.refreshToken,
            id: action.authData.localId,
        },
        loading:false,
    };
}

const authFail = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false,
    };
}

const authLogout = (state) => {
    return {
        ...state,
        authData: {
            ...state.authData,
            email: null,
            displayName: null,
            idToken: null,
            registered: false,
            refreshToken: null,
            id: null,
        },
    }
}

const authClearError = state => {
    return{
        ...state,
        error: null,
    }
}

export default reducer;