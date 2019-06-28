import React, { Component } from 'react';
//import classes from './Checkout.css'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/contactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';


class Checkout extends Component {

	// componentWillMount() {
	// 	this.props.onInitPurchase()
	// }


	checkoutCanceledHandler = () => {
		this.props.history.goBack();
	}


	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	}

	render() {
		let summary = <Redirect to='/' />
		if (this.props.ings) {
			const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
			summary = (
				<div>
					{purchasedRedirect}
					<CheckoutSummary
						ingredients={this.props.ings}
						checkoutCanceled={this.checkoutCanceledHandler}
						checkoutContinued={this.checkoutContinuedHandler} />
					<Route path={this.props.match.url + '/contact-data'} component={ContactData} />
				</div>
			)
		}
		return summary

	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		purchased: state.order.purchased
	}
}


// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		onInitPurchase: () => dispatch(actions.purchaseInit())
// 	}
// }



export default connect(mapStateToProps)(Checkout); 