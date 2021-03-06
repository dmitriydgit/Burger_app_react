import { put } from 'redux-saga/effects';
//import { delay } from 'redux-saga/effects';
//import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/index';
import axios from '../../axios-orders';

export function* purchaseBurgerSaga(action) {
	yield put(actions.purchaseBurgerStart())
	try {
		const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData)
		yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData))
	} catch (error) {
		yield put(actions.purchaseBurgerFail(error))
	}
}

export function* fetchOrdersSaga(action) {
	yield put(actions.fetchOrdersStart())
	const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
	try {
		const response = yield axios.get('/orders.json' + queryParams)
		const fetchOrders = [];
		for (let key in response.data) {
			fetchOrders.push({
				...response.data[key],
				id: key
			})
		}
		yield put(actions.fetchOrdersSuccess(fetchOrders))
	} catch (error) {
		yield put(actions.fetchOrdersFail(error))
	}
}

// dispatch(fetchOrdersStart())
// const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
// axios.get('/orders.json' + queryParams)
// 	.then(response => {
// 		const fetchOrders = []
// 		for (let key in response.data) {
// 			fetchOrders.push({
// 				...response.data[key],
// 				id: key
// 			})
// 		}
// 		dispatch(fetchOrdersSuccess(fetchOrders));
// 	})
// 	.catch(error => {
// 		dispatch(fetchOrdersFail(error))
// 	})