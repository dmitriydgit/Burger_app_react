import { put } from 'redux-saga/effects';
//import { delay } from 'redux-saga/effects';
//import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/index';
import axios from '../../axios-orders';

export function* initIngredientsSaga(action) {
	try {
		const response = yield axios.get('https://my-burger-project-edaed.firebaseio.com/ingredients.json')
		yield put(actions.setIngredients(response.data))
	} catch (error) {
		yield put(actions.fetchIngredientsFailed())
	}
}