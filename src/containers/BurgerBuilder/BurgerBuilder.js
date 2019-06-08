import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from "../../axios-orders";
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
	salad: 0.5,
	meat: 1.3,
	bacon: 0.7,
	cheese: 0.4
}


class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	}

	componentDidMount() {
		axios.get('https://my-burger-project-edaed.firebaseio.com/ingredients.json')
			.then(response => {
				console.log(response)
				this.setState({
					ingredients: response.data
				})
			})
			.catch(error => {
				this.setState({
					error: true
				})
			})
	}

	purchaseHandler = () => {
		this.setState({
			purchasing: true
		})
	}

	updatePurchaseState = (ingredients) => {

		let sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey]
			})
			.reduce((sum, el) => {
				return sum + el
			}, 0)


		//console.log(sum)
		this.setState({
			purchasable: sum > 0
		})
		//console.log(this.state.purchasable)
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];

		const updatedCount = oldCount + 1;
		const updatedIngredients = { ...this.state.ingredients }
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		//console.log(oldCount, updatedIngredients, priceAddition, newPrice)
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
		this.updatePurchaseState(updatedIngredients);
	}


	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = { ...this.state.ingredients }
		updatedIngredients[type] = updatedCount;
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		//console.log(oldCount, updatedIngredients, newPrice)
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
		this.updatePurchaseState(updatedIngredients);
	}

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false })
	}
	purchaseContinueHandler = () => {
		// //alert('You continue!')


		const queryParams = [];

		for (let i in this.state.ingredients) {
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
		}

		queryParams.push('price=' + this.state.totalPrice)

		const queryString = queryParams.join('&')

		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		});
	}

	render() {
		const disableInfo = { ...this.state.ingredients };
		for (let key in disableInfo) {
			disableInfo[key] = disableInfo[key] <= 0;
		}

		let orderSummary = null;
		let burger = this.state.error ? <p>Ingrediets cant be loaded</p> : <Spinner />


		if (this.state.ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler}
						disabled={disableInfo}
						price={this.state.totalPrice}
						purchasable={this.state.purchasable}
						ordered={this.purchaseHandler}
					/>
				</Aux>
			);
			orderSummary = <OrderSummary
				ingredients={this.state.ingredients}
				purchaseCanceled={this.purchaseCancelHandler}
				purchaseContinue={this.purchaseContinueHandler}
				totalPrice={this.state.totalPrice}
			/>
		}

		if (this.state.loading) {
			orderSummary = <Spinner />;
		}


		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		)
	}
}

export default WithErrorHandler(BurgerBuilder, axios); 