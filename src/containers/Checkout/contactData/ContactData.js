import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


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
		formIsValid: false,
		loading: false,
		totalPrice: 0
	}

	orderHanler = (e) => {
		e.preventDefault();

		this.setState({
			loading: true
		})

		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
		}

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData
		}
		axios.post('/orders.json', order)
			.then(response => {
				console.log(response)
				this.setState({
					loading: false
				})
				this.props.history.push('/');
			})
			.catch(error => {
				this.setState({
					loading: false
				})
			})
	}

	checkValidity(value, rules) {
		let isValid = true;
		if (!rules) {
			return true
		}
		if (rules.required) {
			isValid = value.trim() !== '' && isValid
		}
		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}
		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}
		return isValid;
	}

	inputChangedHandler = (e, inputIdentifier) => {
		//console.log(e.target.value)
		const updatedFormData = { ...this.state.orderForm };
		const updatedFormEl = { ...updatedFormData[inputIdentifier] };
		updatedFormEl.value = e.target.value;

		updatedFormEl.valid = this.checkValidity(updatedFormEl.value, updatedFormEl.validation);
		updatedFormEl.touched = true;
		updatedFormData[inputIdentifier] = updatedFormEl;
		//console.log(updatedFormEl)

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

				<Button btnType="Success" clicked={this.orderHanler} disabled={!this.state.formIsValid}>ORDER</Button>
			</form>
		);
		if (this.state.loading) {
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

export default ContactData; 