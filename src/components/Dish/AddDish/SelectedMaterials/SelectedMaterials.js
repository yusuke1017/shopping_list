import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const style = {
}

class SelectedMaterials extends Component {
	constructor(props) {

		super(props);
		this.state = {
			materialData: [],
		}
	}
	// 追加された食材データの表示
	getListData() {

		// 追加された食材の受け取り
		let materials = this.props.materialData;
		let result = [];
	
		for (let i = 0; i < materials.length; i++) {
			if(materials[i] === undefined){
		} else {
				result.push(<><ListItem key={i} >
					<ListItemText primary={materials[i]["name"] + '：' + materials[i]["quantity"]} />
					<ListItemSecondaryAction>
						<IconButton edge="end" aria-label="delete" onClick={()=> {this.props.deleteMaterial(i)}}>
							<DeleteIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
					<Divider />
				</>
				)
			}
		}
		if (result === null || result.length === 0) {
			result.push(<ListItem key="0"><ListItemText primary="食材を登録しましょう" /></ListItem>);
		}
		return result;
	}

	render() {
		return (
			<>
				<Grid item xs={12} md={6}>
					<div className={this.props.classes.list_box}>
						<List>
							{this.getListData()}
						</List>
					</div>
				</Grid>
			</>
		);
	}
}

export default withStyles(style)(
	connect((state => state))(SelectedMaterials)
);