import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'

const controls = [
	{
		label: 'Salad', type: 'salad'
	},
	{
		label: 'Bacon', type: 'bacon'
	},
	{
		label: 'Meat', type: 'meat'
	},
	{
		label: 'Cheese', type: 'cheese'
	}
]

const buidControls = (props) => (

	<div className={classes.BuildControls}>
		<p>Current price is: <strong>{props.price.toFixed(2)}</strong> </p>
		{controls.map((control) => {
			return <BuildControl
				key={control.type}
				label={control.label}
				added={() => props.ingredientAdded(control.type)}
				removed={() => props.ingredientRemoved(control.type)}
				disabled={props.disabled[control.type]}
			/>
		})}
		<button
			className={classes.OrderButton}
			disabled={!props.purchasable}
			onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : "SIGN UP TO ORDER"}</button>
	</div>
)


export default buidControls;