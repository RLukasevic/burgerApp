import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4.5,
}

const ING_PRICES = {
    salad: 0.2,
    bacon: 0.7,
    cheese: 0.5,
    meat: 1.1,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ING: {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] +1
                },
                totalPrice: state.totalPrice + ING_PRICES[action.ingredientName]
            };
        }
        case actionTypes.REMOVE_ING: {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] -1
                },
                totalPrice: state.totalPrice - ING_PRICES[action.ingredientName]
            };
        }

        default: return state;
    }
}

export default reducer;