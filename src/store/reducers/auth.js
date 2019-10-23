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
        case actionTypes.AUTH_START: return authStart(state, action)
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actionTypes.AUTH_FAIL: return authFail(state, action)

        default: return state;
    }
}

const authStart = (state, action) => {
    return {
        ...state,
        loading: true,
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

export default reducer;









// TODO /////////////////////////////////////////////////////////////////////////////////////
// ERROR HANDLING //////////////////////////////////////////// 