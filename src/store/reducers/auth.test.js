import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('[Auth reducer]', () => {
    // let wrapper;

    // beforeEach(() => {
        
    // });

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            authData: {
            email: null,
            displayName: null,
            idToken: null,
            registered: false,
            refreshToken: null,
            id: null,
        },
        error: null,
        loading: false,});
    });

    it('should store a token upon login', () => {
        expect(reducer({
            authData: {
            email: null,
            displayName: null,
            idToken: null,
            registered: false,
            refreshToken: null,
            id: null,
        },
        error: null,
        loading: false,}, {type: actionTypes.AUTH_SUCCESS, authData: {email: null,displayName: null,idToken: 'token',registered: false,refreshToken: null,localId: 'id',}}))
        .toEqual({
            authData: {
            email: null,
            displayName: null,
            idToken: 'token',
            registered: false,
            refreshToken: null,
            id: 'id',
        },
        error: null,
        loading: false,})
    })
});
