import React from 'react';
import classes from './Input.css';

const input = (props) => {
	let inputElement = null;
	const inputClasses = [classes.inputElement];
	let validationError = null;

	if (props.invalid && props.touched) {
		validationError = <p className={classes.ValidationError}>Please enter a valid {props.valueType}!</p>;
	}

	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid);
	}

	switch (props.elementType) {
		case ('input'):
			inputElement = <input
				type='text'
				{...props.elementConfig}
				className={inputClasses.join(' ')}
				value={props.value}
				onChange={props.changed}
			/>
			break;
		case ('textarea'):
			inputElement = <textarea
				{...props.elementConfig}
				className={inputClasses.join(' ')}
				value={props.value}
				onChange={props.changed} />
			break;
		case ('select'):
			inputElement = (<select
				onChange={props.changed}
				className={inputClasses.join(' ')}
				value={props.value} >
				{props.elementConfig.options.map(option => (
					<option key={option.value} value={option.value}>{option.displayValue}</option>
				))}
			</select>)
			break;
		default:
			inputElement = <input
				type='text'
				{...props.elementConfig}
				className={inputClasses.join(' ')}
				value={props.value}
				onChange={props.changed}
			/>
	}

	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
			{validationError}
		</div>
	)
}



export default input;