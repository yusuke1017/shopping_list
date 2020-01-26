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
import DeleteMaterial from '../DeleteMaterial/DeleteMaterial'

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

class ShowMaterial extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filterCat: ""
		}
		this.onFilter = this.onFilter.bind(this);
	}

	// 食材一覧
	getListData() {
		// 食材取得
		const materials = this.props.materials;
		let result = [];

		if (materials === false || materials.length === 0) {
			return [<ListItem key="loading"><ListItemText primary="Loading..." /></ListItem>];
		} 

		// デフォルト、あるいはカテゴリ「全て」を選択時は全データをresultに格納する
		if (this.state.filterCat === "" || this.state.filterCat === "0") {
			for(let i = 0; i < materials.length; i++){
				result.push(<><ListItem key={materials[i]['key'].toString()} >
					<ListItemText primary={materials[i]['key']} />
					<ListItemSecondaryAction>
						<DeleteMaterial name={materials[i]['key']} />
					</ListItemSecondaryAction>
				</ListItem>
					<Divider />
				</>
				)
			}
		} else {

			// カテゴリが選択されている時はカテゴリが一致する食材のみをresultに格納する
			for(let i = 0; i < materials.length; i++){
				if (this.state.filterCat === materials[i]['category']) {
					result.push(<><ListItem key={materials[i]['key'].toString()+"cat"} >
						<ListItemText primary={materials[i]['key']} />
						<ListItemSecondaryAction>
							<DeleteMaterial name={materials[i]['key']} />
						</ListItemSecondaryAction>
					</ListItem>
						<Divider />
					</>
					)
				}
			}
		}
		if (result === false || result.length === 0) {
			return [<ListItem key="no data"><ListItemText primary="登録がありません" /></ListItem>];
		} 
		return result;
	}

	// ドロップダウン用食材カテゴリー
	getOptionData() {
		const cat_data = this.props.materialcat.slice();
		if (!cat_data[9]) {
			cat_data.push({
				key: "0",
				value: "全て"
			});
		}
		let result = [];
		if (cat_data === null || cat_data.length === 0) {
			return [<MenuItem key="no category" value="">no data</MenuItem>];
		}
		for(let i = 0; i < cat_data.length; i++){
			result.push(<MenuItem key={cat_data[i]['key'].toString()} value={cat_data[i]['key']}>{cat_data[i]['value']}</MenuItem>
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
				<Typography className={this.props.classes.headline}>食材一覧</Typography>

				{/* 食材カテゴリドロップダウン */}
				<FormControl color="secondary" variant="outlined" className={this.props.classes.input_box}>
					<InputLabel id="simple-select-outlined-label">カテゴリ</InputLabel>
					<Select
						variant="outlined"
						labelId="simple-select-outlined-label"
						id="simple-select-outlined"
						value={this.state.filterCat}
						onChange={this.onFilter}
					>
						{/* ドロップダウン用食材カテゴリー */}
						{this.getOptionData()}
					</Select>
				</FormControl>

				<Grid>
					<Paper>
						<List className={this.props.classes.list_box}>
							{/* 食材一覧 */}
							{this.getListData()}
						</List>
					</Paper>
				</Grid>
			</div>
		);
	}
}

export default withStyles(style)(
	connect((state => state))(ShowMaterial)
);