import * as actionTypes from '../actions/actionTypes';


const initialState = {
    orders: [],
    loading: false,
    error: false,
    purchased: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS: return pBurgSuccess(state, action)
        case actionTypes.PURCHASE_BURGER_FAIL: return pBurgFail(state)
        case actionTypes.PURCHASE_BURGER_START: return pBurgStart(state)
        case actionTypes.PURCHASE_INIT: return pBurgInit(state)
        case actionTypes.FETCH_ORDERS_START: return fOrdersStart(state)
        case actionTypes.FETCH_ORDERS_SUCCESS: return fOrdersSuccess(state, action)
        case actionTypes.FETCH_ORDERS_FAIL: return fOrdersFail(state, action)

        default: return state;
    }
}

const pBurgSuccess = (state, action) => {
    const newOrder = {...action.orderData,id: action.orderID}
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                loading: false,
                purchased: true,
            };
}

const pBurgFail = (state) => {
    return {
        ...state,
        error: true,
        loading: false,
        purchased: false,
    };
}

const pBurgStart = (state) => {
    return {
        ...state,
        loading: true,
    }
}

const pBurgInit = (state) => {
    return {
        ...state,
        purchased: false,
    }
}

const fOrdersStart = (state) => {
    return {
        ...state,
        loading: true,
    }
}

const fOrdersSuccess = (state, action) => {
    return {
        ...state,
        orders: action.orders,
        loading: false,
    }
}

const fOrdersFail = (state, action) => {
    return {
        ...state,
        error: action.errorMsg,
        loading: false,
    }
}


export default reducer;