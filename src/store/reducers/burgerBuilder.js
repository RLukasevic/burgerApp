import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 4.5,
    error: false,
}

const ING_PRICES = {
    salad: 0.2,
    bacon: 0.7,
    cheese: 0.5,
    meat: 1.1,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ING: return addIng(state, action)
        case actionTypes.REMOVE_ING: return removeIng(state, action)
        case actionTypes.SET_INGREDIENTS: return setIngs(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAIL: return updateObject(state, {error: true})

        default: return state;
    }
}

const addIng = (state, action) => {
    let newPrice = state.totalPrice + ING_PRICES[action.ingredientName];
    newPrice = +newPrice.toFixed(2);
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] +1
        },
        totalPrice: newPrice,
    };
}

const removeIng = (state, action) => {
    let newPrice = state.totalPrice - ING_PRICES[action.ingredientName];
    newPrice = +newPrice.toFixed(2);
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] -1
        },
        totalPrice: newPrice,
    };
}

const setIngs = (state, action) => {
    return {
        ...state,
        ingredients: action.ings,
        error: false,
        totalPrice: 4.5,
    };
}

export default reducer;