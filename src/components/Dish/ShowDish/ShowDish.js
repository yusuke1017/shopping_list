import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DeleteDish from '../DeleteDish/DeleteDish'
import UpdateDish from '../UpdateDish/UpdateDish'

const style = {
	input_box: {
		marginRight: "15px",
		marginBottom: "15px",
		minWidth: "120px"
	},
	headline: {
		marginBottom: "15px",
		fontSize: "20px",
	},
	list_box: {
		height: "400px",
		overflow: "auto",
	},
}

class ShowDish extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filterCat: ""
		}
		this.onFilter = this.onFilter.bind(this);
	}

	// 料理一覧データの生成
	getListData() {
		// 料理データ取得
		const dishes = this.props.dishes;
		let result = [];

		if (dishes === null || dishes.length === 0) {
			return [<ListItem key="0"><ListItemText primary="Loading..." /></ListItem>];
		}

		// デフォルト、あるいはカテゴリ「全て」を選択時は全データをresultに格納する
		if (this.state.filterCat === "" || this.state.filterCat === "0") {
			for (let i = 0; i < dishes.length; i++) {
				result.push(<><ListItem key={dishes[i]['id']} >
					<ListItemText primary={dishes[i]['name']} />
					<ListItemSecondaryAction>
						<UpdateDish id={dishes[i]['id']} name={dishes[i]['name']} category={dishes[i]['category']} materialData={dishes[i]['materials']} dishcat={this.props.dishcat} />
						<DeleteDish id={dishes[i]['id']} name={dishes[i]['name']} />
					</ListItemSecondaryAction>
				</ListItem>
					<Divider />
				</>
				)
			}
		} else {
			for (let i = 0; i < dishes.length; i++) {
				// 選択されたカテゴリと一致するものをresultに格納する
				if (this.state.filterCat === dishes[i]['category']) {
					result.push(<><ListItem key={dishes[i]['id']} >
						<ListItemText primary={dishes[i]['name']} />
						<ListItemSecondaryAction>
							<UpdateDish id={dishes[i]['id']} name={dishes[i]['name']} category={dishes[i]['category']} materialData={dishes[i]['materials']} dishcat={this.props.dishcat} />
							<DeleteDish id={dishes[i]['id']} name={dishes[i]['name']} />
						</ListItemSecondaryAction>
					</ListItem>
						<Divider />
					</>
					)
				}
			}
		}

		if (result === null || result.length === 0) {
			result.push(<ListItem key="0"><ListItemText primary="登録がありません" /></ListItem>);
		}

		return result;
	}

	// 料理カテゴリーデータの生成
	getOptionData() {
		let result = [];
		const cat_data = this.props.dishcat.slice();
		if (!cat_data[4]) {
			cat_data.push({
				key: "0",
				value: "全て"
			});
		}
		if (cat_data === null || cat_data.length === 0) {
			return [<MenuItem key="0" value="">no data</MenuItem>];
		}
		for(let i = 0; i < cat_data.length; i++){
			result.push(<MenuItem key={cat_data[i]['key']} value={cat_data[i]['key']}>{cat_data[i]['value']}</MenuItem>
			)
		}
		return result;
	}

	onFilter(e) {
		this.setState({
			filterCat: e.target.value
		});
	}

	render() {
		return (
			<div className="block">
				<Typography className={this.props.classes.headline}>料理一覧</Typography>

				{/* 料理カテゴリ選択 */}
				<FormControl color="secondary" variant="outlined" className={this.props.classes.input_box}>
					<InputLabel id="simple-select-outlined-label">カテゴリ</InputLabel>
					<Select
						variant="outlined"
						labelId="simple-select-outlined-label"
						id="simple-select-outlined"
						value={this.state.filterCat}
						onChange={this.onFilter}
					>
						{this.getOptionData()}
					</Select>
				</FormControl>

				<Grid>
					<Paper>
						<List className={this.props.classes.list_box}>
							{this.getListData()}
						</List>
					</Paper>
				</Grid>
			</div>
		);
	}
}

export default withStyles(style)(
	connect((state => state))(ShowDish)
);