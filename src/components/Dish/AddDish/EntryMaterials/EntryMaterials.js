import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import KitchenIcon from '@material-ui/icons/Kitchen';
import RefMaterials from './RefMaterials'

const style = {
	input_box: {
		marginRight: "15px",
		minWidth: "120px"
	},
	headline: {
		marginBottom: "15px",
		fontSize: "20px",
	},
	button_accent: {
		color: "#FE6726",
		borderColor: "#FE6726",
		'&:hover': {
			backgroundColor: "#FE6726",
			color: "#fff"
		}
	},
	button_align: {
		justifyContent: "center"
	},
	material_txt: {
		marginRight: "15px"
	},
	material_icon: {
		marginRight: "15px",
		border: "1px solid",
		color: "#FE6726",
		borderColor: "#FE6726",
		'&:hover': {
			backgroundColor: "#FE6726",
			color: "#fff"
		}
	},
	align_form: {
		paddingTop: "5px",
		paddingBottom: "5px",
	}
}

class EntryMaterials extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			dishName: '',
			dishCat: '',
			materialQuantity: '',
			entryMaterial: '食材を選択',
			entryMaterialCat: '',
			materialData: [],
			anchorEl: null,
		}

		this.handleClose = this.handleClose.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.addMaterial = this.addMaterial.bind(this);
		this.onChangeQuantity = this.onChangeQuantity.bind(this);
		this.setMaterialData = this.setMaterialData.bind(this);
	}

	handleClick(e) {
		this.setState({
			anchorEl: e.currentTarget
		})
	};

	handleClose() {
		this.setState({
			anchorEl: null
		})
	};
	addMaterial(name, category) {
		this.setState({
			entryMaterial: name,
			entryMaterialCat: category,
			anchorEl: null,
		})
	};
	onChangeQuantity(e) {
		this.setState({
			materialQuantity: e.target.value
		})
	}
	setMaterialData() {
		let name = this.state.entryMaterial;
		let category = this.state.entryMaterialCat;
		let quantity = this.state.materialQuantity;
		if (name === "食材を選択" || !quantity) {
			alert("食材選択と量は必須項目です");
			return;
		}
		if(quantity == false){
      alert('量をスペースにすることはできません');
      return;
		}
		this.props.updateMaterialData(name, quantity, category);
		this.setState({
			entryMaterial: '食材を選択',
			entryMaterialCat: "",
			materialQuantity: "",
		})
	}

	render() {
		const open = Boolean(this.state.anchorEl);
		return (
			<>
				<Typography className={this.props.classes.headline}>食材追加</Typography>
				<Box display="flex" alignItems="center" flexWrap="wrap" alignContent="flex-start">

					{/* ポップオーバーボタン */}
					<Box className={this.props.classes.align_form}>
						<IconButton onClick={this.handleClick} className={this.props.classes.material_icon} aria-label="Material">
							<KitchenIcon />
						</IconButton>
					</Box>
					<Popover
						open={open}
						anchorEl={this.state.anchorEl}
						onClose={this.handleClose}
						anchorReference="anchorPosition"
						anchorPosition={{ top: 50, left: 0 }}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'left',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'left',
						}}>
						{/* 食材選択ポップオーバー */}
						<RefMaterials addMaterial={this.addMaterial} props={this.props} />
					</Popover>

					{/* 選択された食材名(初期値は食材を選択) */}
					<Box className={this.props.classes.align_form}>
						<Typography className={this.props.classes.material_txt}>{this.state.entryMaterial}</Typography>
					</Box>

					{/* 区切り */}
					<Typography className={this.props.classes.material_txt}>:</Typography>

					<Box className={this.props.classes.align_form}>

						{/* 量入力 */}
						<TextField onChange={this.onChangeQuantity} value={this.state.materialQuantity} className={this.props.classes.input_box} id="outlined-basic-entry" label="量" variant="outlined" color="secondary" />
					</Box>

					<Box className={this.props.classes.align_form}>
						<Button onClick={this.setMaterialData} size="large" variant="outlined" className={this.props.classes.button_accent}>追加</Button>
					</Box>
				</Box>

			</>
		);
	}
}

export default withStyles(style)(
	connect((state => state))(EntryMaterials)
);