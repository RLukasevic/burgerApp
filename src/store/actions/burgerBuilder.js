import * as actionTypes from './actionTypes';
import axios from '../../axiosOrders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_ING,
        ingredientName: name,
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_ING,
        ingredientName: name,
    };
};

export const setIngredients = (ings) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ings: {
            salad: ings.salad,
            bacon: ings.bacon,
            cheese: ings.cheese,
            meat: ings.meat,
        }
    };
};

export const fetchIngredientsFail = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAIL,

    };
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
        .then(res => {
            dispatch(setIngredients(res.data));
        } )
        .catch(e => {
            dispatch(fetchIngredientsFail());
        } )
    };
};