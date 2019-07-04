import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

	render() {
		const ingredientSummary = Object.keys(this.props.ingredients)
			.map(igKey => {
				return <li key={igKey}>
					<span
						style={{ testTransform: "capitalize" }}>{igKey}</span>: {this.props.ingredients[igKey]}
				</li>
			})

		return (
			<Aux>
				<h3>Your order	</h3>
				<p> Burger with following ingredients:</p>
				<ul>
					{ingredientSummary}
				</ul>
				<p><strong>  Total price is: {this.props.totalPrice.toFixed(2)} USD</strong></p>
				<p>Continue to checkout?</p>
				<Button btnType='Danger' clicked={this.props.purchaseCanceled} >CANCEL</Button>
				<Button btnType='Success' clicked={this.props.purchaseContinue}>CONTINUE</Button>
			</Aux>
		)
	}
}

export default OrderSummary;