import React from 'react';
import classes from './Button.css';
// import Aux from '../../../hoc/Aux';
// import Backdrop from '../Backdrop/Backdrop';

const Button = (props) => {

	return (
		<button className={[classes.Button, classes[props.btnType]].join(' ')} onClick={props.clicked} disabled={props.disabled}> {props.children}</button>
	)
}

export default Button;