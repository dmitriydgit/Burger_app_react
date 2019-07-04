import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => (
	<ul className={classes.NavigationItems}>
		<NavigationItem link="/" exact >Burger builder</NavigationItem>
		{props.isAuthentificated
			? <NavigationItem link="/orders">Orders</NavigationItem>
			: null
		}
		{!props.isAuthentificated
			? <NavigationItem link="/auth">Authentificate</NavigationItem>
			: <NavigationItem link="/logout">Logout</NavigationItem>
		}
	</ul>
)

export default NavigationItems;