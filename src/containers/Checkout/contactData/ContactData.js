import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';



class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your name',
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your street',
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			zip: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your ZIP code',
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your country',
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your email',
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [{ value: 'fastest', displayValue: 'fastest' },
					{ value: 'cheepest', displayValue: 'cheepest' }],
				},
				valid: true,
				validation: {},
				value: 'fastest',
			},
		},
		formIsValid: false
	}

	orderHandler = (e) => {
		e.preventDefault();

		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
		}

		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: formData,
			userId: this.props.userId
		}
		this.props.onOrderBurger(order, this.props.token);
	}



	inputChangedHandler = (e, inputIdentifier) => {

		const updatedFormEl = updateObject(this.state.orderForm[inputIdentifier],
			{
				value: e.target.value,
				valid: checkValidity(e.target.value, this.state.orderForm[inputIdentifier].validation),
				touched: true
			})

		const updatedFormData = updateObject(this.state.orderForm, {
			[inputIdentifier]: updatedFormEl
		})


		let formIsValid = true;
		for (let inputIdentifier in updatedFormData) {
			formIsValid = updatedFormData[inputIdentifier].valid && formIsValid;
		}

		this.setState({
			orderForm: updatedFormData,
			formIsValid: formIsValid
		})
	}

	render() {
		const formsElementArray = [];
		for (let key in this.state.orderForm) {
			formsElementArray.push({
				id: key,
				config: this.state.orderForm[key]
			})
		}

		let form = (
			<form onSubmit={this.orderHandler}>
				{formsElementArray.map(el => {
					return <Input
						key={el.id}
						elementType={el.config.elementType}
						elementConfig={el.config.elementConfig}
						invalid={!el.config.valid}
						shouldValidate={el.config.validation}
						touched={el.config.touched}
						valueType={el.id}
						value={el.config.value}
						changed={(event) => this.inputChangedHandler(event, el.id)}
					/>
				})}

				<Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
			</form>
		);
		if (this.props.loading) {
			form = <Spinner />

		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter Your contact data</h4>
				{form}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios)); 