import React, { Component } from 'react';
//import classes from './Checkout.css'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/contactData/ContactData';
import { Route } from 'react-router-dom';


class Checkout extends Component {

	state = {
		ingredients: null,
		totalPrice: 0
	}

	componentWillMount() {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let price = 0;
		for (let param of query.entries()) {
			if (param[0] === 'price') {
				price = param[1];
			} else {
				ingredients[param[0]] = +param[1];
			}
		}
		this.setState({ ingredients: ingredients, totalPrice: price });
	}

	checkoutCanceledHandler = () => {
		this.props.history.goBack();
	}


	checkoutCContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	}

	render() {

		return (
			<div>
				<CheckoutSummary
					ingredients={this.state.ingredients}
					checkoutCanceled={this.checkoutCanceledHandler}
					checkoutContinued={this.checkoutCContinuedHandler} />
				<Route path={this.props.match.url + '/contact-data'} render={(props) => (<ContactData
					ingredients={this.state.ingredients}
					price={this.state.totalPrice}
					{...props} />
				)} />
			</div>
		)
	}
}

export default Checkout; 