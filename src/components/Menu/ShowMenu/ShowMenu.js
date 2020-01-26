import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import theme from '../../Theme/ThemeProvider';
import AddMenu from '../AddMenu/AddMenu'
import menus from '../../../actions/menus';
import dish from '../../../actions/dishes'
import dishcat from '../../../actions/dishcat'

const style = {
	button_accent: {
		color: "#FE6726",
		borderColor: "#FE6726",
		'&:hover': {
			backgroundColor: "#FE6726",
			color: "#fff"
		}
	},
	button: {
		marginRight: "15px",
	},
	input_box: {
		marginRight: "15px",
		marginBottom: "15px"
	},
	headline: {
		marginBottom: "15px",
		fontSize: "20px",
	},
	col_s: {
		paddingLeft: "15px",
	},
	list_box: {
		backgroundColor: theme.palette.background.paper,
	},
	align_fomr: {
		paddingTop: "5px",
		paddingBottom: "5px",
	}
}

class ShowMenu extends Component {

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(dish.loadDishes());
		dispatch(dishcat.getDishCat());
	}

	constructor(props) {
		super(props);
		this.state = {
			monMenu: [],
			tueMenu: [],
			wedMenu: [],
			thuMenu: [],
			firMenu: [],
			satMenu: [],
			sunMenu: [],
		}
		this.updateData = this.updateData.bind(this);
		this.saveMenu = this.saveMenu.bind(this);
		this.loadMenu = this.loadMenu.bind(this);
		this.resetMenu = this.resetMenu.bind(this);
	}

	// AddMenuのから更新
	updateData(data, day) {
		let target = "";
		if (day === "月") {
			target = "monMenu";
		} else if (day === "火") {
			target = "tueMenu";
		} else if (day === "水") {
			target = "wedMenu";
		} else if (day === "木") {
			target = "thuMenu";
		} else if (day === "金") {
			target = "firMenu";
		} else if (day === "土") {
			target = "satMenu";
		} else if (day === "日") {
			target = "sunMenu";
		}
		this.setState({
			[target]: data
		})
	}

	// テーブル内のコンテンツの設定
	setTable() {
		let result = [];
		let rows = [
			this.createData('月', this.state.monMenu),
			this.createData('火', this.state.tueMenu),
			this.createData('水', this.state.wedMenu),
			this.createData('木', this.state.thuMenu),
			this.createData('金', this.state.firMenu),
			this.createData('土', this.state.satMenu),
			this.createData('日', this.state.sunMenu),
		];

		rows.map(row => (
			result.push(
				<TableRow key={row.day.toString()}>
					<TableCell padding="checkbox" className={this.props.classes.col_s}>{row.day}</TableCell>
					<TableCell padding="checkbox">
						<AddMenu menuData={row.menuData} day={row.day} updateData={this.updateData} />
					</TableCell>
					<TableCell className={this.props.classes.col_s}>{row.result}</TableCell>
				</TableRow>
			)))
		return result;
	}

	// setTableから曜日と曜日ごとの料理情報を受け取って整形
	createData(day, menu) {

		let result = [];
		let menuData = [];
		let newData = [];

		menuData = menu.slice();
		newData = menu.slice();

		if (newData.length === 0 || newData === "") {
			result.push("登録がありません");
		} else {
			for (let i = 0; i < newData.length; i++) {
				for (let key in newData[i]) {
					result.push(<p key={newData[i][key] + i}>{newData[i][key]}</p>);
				}
			}
		}
		// resulet:表示されるテキスト menuData:更新用のデータ
		return { day, result, menuData };
	}

	loadMenu() {
		this.setState({
			monMenu: this.props.mon,
			tueMenu: this.props.tue,
			wedMenu: this.props.wed,
			thuMenu: this.props.thu,
			firMenu: this.props.fri,
			satMenu: this.props.sat,
			sunMenu: this.props.sun,
		})
	}

	saveMenu() {
		let data = {};
		data = {
			monday: this.state.monMenu,
			tuesday: this.state.tueMenu,
			wednesday: this.state.wedMenu,
			thursday: this.state.thuMenu,
			friday: this.state.firMenu,
			saturday: this.state.satMenu,
			sunday: this.state.sunMenu,
		}
		const { dispatch } = this.props;
		dispatch(menus.addMenu(data));
		alert("献立を保存しました")
	}
	resetMenu() {
		this.setState({
			monMenu: [],
			tueMenu: [],
			wedMenu: [],
			thuMenu: [],
			firMenu: [],
			satMenu: [],
			sunMenu: [],
		})
	}

	render() {
		return (
			<>
				<Typography className={this.props.classes.headline}>献立登録</Typography>

				<div className={this.props.classes.input_box}>
					<Box display="flex" component="section" alignItems="center" flexWrap="wrap" alignContent="flex-start">

						<Box className={this.props.classes.align_fomr}>
							<Button onClick={this.loadMenu} className={this.props.classes.button} size="large" variant="outlined" color="secondary">保存済の献立</Button>
						</Box>

						<Box className={this.props.classes.align_fomr}>
							<Button onClick={this.resetMenu} className={this.props.classes.button} size="large" variant="outlined" color="secondary">リセット</Button>
						</Box>
						<Box className={this.props.classes.align_fomr}>
							<Button onClick={this.saveMenu} size="large" variant="outlined" className={this.props.classes.button_accent}>保存</Button>
						</Box>
					</Box>
				</div>

				<TableContainer component={Paper}>
					<Table>
						<TableBody>
							{this.setTable()}
						</TableBody>
					</Table>
				</TableContainer>
			</>
		);
	}
}

export default withStyles(style)(
	connect((state => state))(ShowMenu)
);