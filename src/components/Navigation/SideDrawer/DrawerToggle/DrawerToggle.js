import React from 'react';
// import Logo from '../../Logo/Logo';
// import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './DrawerToggle.css';

// import Backdrop from '../../UI/Backdrop/Backdrop'
// import Aux from '../../../hoc/Aux';

const DrawerToggle = (props) => {

	return (
		<div onClick={props.clicked} className={classes.DrawerToggle}>
			<div>	</div>
			<div>	</div>
			<div>	</div>
		</div>
	)
}

export default DrawerToggle;