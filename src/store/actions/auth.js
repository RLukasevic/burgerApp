import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (data) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: data,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const auth = (email, password, isSigningUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxNnPSinjBkQ9-JUNv-Rbb3zlK2pxkKyE';

        if (!isSigningUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxNnPSinjBkQ9-JUNv-Rbb3zlK2pxkKyE';
        } 
        
        axios.post(url,authData)
        .then(res => {
            console.log(res.data);
            dispatch(authSuccess(res.data));
         } )
        .catch(e => {
             console.log(e);
            dispatch(authFail(e));
        } )
        
    };
};
