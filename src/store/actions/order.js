import * as actionTypes from './actionTypes';
import axios from '../../axiosOrders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderID: id,
        orderData: orderData,
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,

    };
};

export const purchaseBurgerStarting = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    }
}

export const purchaseBurgerStart = (orderData) => {
    return dispatch => {        
        dispatch(purchaseBurgerStarting());
            axios.post('/orders.json', orderData)
            .then((response) => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData)) 
            })
                .catch(e => {
                    dispatch(purchaseBurgerFail(e))
                });
            return {

        };
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    }
}
export const fetchOrdersSuccess = (fetchedOrders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: fetchedOrders,
    }
}
export const fetchOrdersFail = (e) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        errorMsg: e,
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
        .then( res => {
            const fetchedOrders = [];
            for(let key in res.data) {
                fetchedOrders.push({...res.data[key], id: key});
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch((e) => {
            dispatch(fetchOrdersFail(e));
        })
        return {}
    }
}