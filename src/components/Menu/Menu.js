import React, { Component } from 'react';
import { connect } from 'react-redux'
import ShowMenu from './ShowMenu/ShowMenu';
import menu from '../../actions/menus'

class Menu extends Component {

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(menu.loadMenus());
	}

	render() {

		let loadMonday = [];
		let loadTuesday = [];
		let loadWednesday = [];
		let loadThursday = [];
		let loadFriday = [];
		let loadSaturday = [];
		let loadSunday = [];

		const { menus } = this.props;
		let newData = menus[0];

		for (let key in newData) {
			if (key === 'monday') {
				loadMonday = newData[key];
			} else if (key === 'tuesday') {
				loadTuesday = newData[key];
			} else if (key === 'wednesday') {
				loadWednesday = newData[key];
			} else if (key === 'thursday') {
				loadThursday = newData[key];
			} else if (key === 'friday') {
				loadFriday = newData[key];
			} else if (key === 'saturday') {
				loadSaturday = newData[key];
			} else if (key === 'sunday') {
				loadSunday = newData[key];
			}
		}

		return (
			<>
				<ShowMenu
					menus={menus}
					mon={loadMonday}
					tue={loadTuesday}
					wed={loadWednesday}
					thu={loadThursday}
					fri={loadFriday}
					sat={loadSaturday}
					sun={loadSunday}
				/>
			</>
		);
	}

}

export default connect((state => state))(Menu);