import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import material from '../../../../actions/materials'
import materialcat from '../../../../actions/materialcat'

const style = {
	input_box: {
		marginRight: "15px",
		minWidth: "120px"
	},
	list_box: {
		height: "400px",
		overflow: "auto",
	},
	button_accent: {
		color: "#FE6726",
		borderColor: "#FE6726",
		'&:hover': {
			backgroundColor: "#FE6726",
			color: "#fff"
		},
	},
	pop_box: {
		padding: "30px"
	},
	align_form: {
		paddingTop: "5px",
		paddingBottom: "5px",
	}
}

class RefMaterials extends Component {

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(material.loadMaterials());
		dispatch(materialcat.getMaterialCat());
	}

	constructor(props) {
		super(props);
		this.state = {
			category: '',
			material: '',
			disabled: true,
		}
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeCat = this.onChangeCat.bind(this);
		this.selectMaterila = this.selectMaterila.bind(this);
		this.addMaterial = this.addMaterial.bind(this);
	}

	onChangeName(e) {
		this.setState({
			material: e.target.value
		});
	}
	onChangeCat(e) {
		this.setState({
			category: e.target.value
		});
	}
	selectMaterila(e) {
		this.props.addMaterial(e.target.innerText, e.currentTarget.dataset.category);
	}
	addMaterial() {
		let material_name = this.state.material;
		let material_id = this.state.category;
		let data = {
			material: material_name,
			category: material_id
		};
		const { dispatch } = this.props;
		dispatch(material.addMaterial(data))
	}

	// 食材一覧データの表示
	getListData() {
		// 食材データ取得
		const materials = this.props.materials;
		let nameFilter = [];
		let catFilter = [];
		let result = [];
		let disabled = true;

		if (materials === null || materials.length === 0) {
			return [<ListItem key="0"><ListItemText primary="Loading..." /></ListItem>];
		}

		// 食材名と部分一致したものを格納
		materials.forEach(material => {

			// 記号入力をはじく
			let regData = new RegExp(/[!"#$%&'()*+\-.,/:;<=>?@[\\\]^_`{|}~]/,'g');
			if (regData.test(this.state.material)) {
				this.setState({
					material: '',
				})
			} else {
				let regString = new RegExp(this.state.material + '(.*?)', 'g');

				if (regString.test(material.key)) {
					nameFilter.push(material);
				}

			}
		});

		// カテゴリー未選択の場合は全て出力（デフォルト）
		if (this.state.category === "") {
			catFilter = nameFilter.slice();
		} else {
			nameFilter.forEach(nameFilter => {
				if (this.state.category === nameFilter.category) {
					catFilter.push(nameFilter);
				}
			});
		}

		for(let i = 0; i < catFilter.length; i++){
			result.push(<><ListItem key={catFilter[i]['key']} data-category={catFilter[i]['category']} button onClick={this.selectMaterila}>
				<ListItemText primary={catFilter[i]['key']} />
			</ListItem>
				<Divider />
			</>
			)
		}

		if (result === null || result.length === 0) {
			result.push(<ListItem key="0"><ListItemText primary="登録がありません" /></ListItem>);

			// カテゴリ選択状態で名前検索に引っかからない場合はその場で登録できるようにボタンをアクティブにするフラグ
			if (this.state.material && this.state.category) {
				disabled = false;
			}
		} else {
			disabled = true;
		}

		return { result, disabled };
	}

	render() {
		return (
			<div className={this.props.classes.pop_box}>
				<Box display="flex" alignItems="center" flexWrap="wrap" alignContent="flex-start">

					{/* 食材名入力 */}
					<Box className={this.props.classes.align_form}>
						<TextField onChange={this.onChangeName} value={this.state.material} label="食材名 *記号不可" variant="outlined" className={this.props.classes.input_box} color="secondary" />
					</Box>

					{/* 食材カテゴリドロップダウン */}
					<Box className={this.props.classes.align_form}>
						<FormControl id="add-form" color="secondary" variant="outlined" className={this.props.classes.input_box}>
							<InputLabel id="simple-select-outlined-label">カテゴリ</InputLabel>
							<Select
								variant="outlined"
								labelId="simple-select-outlined-label"
								id="simple-select-outlined"
								value={this.state.category}
								onChange={this.onChangeCat}
							>
								{this.props.materialcat.map(category => <MenuItem key={category.key} value={category.key}>{category.value}</MenuItem>)}
							</Select>
						</FormControl>
					</Box>

					<Box className={this.props.classes.align_form}>
						<Button onClick={this.addMaterial} disabled={this.getListData().disabled} size="large" variant="outlined" className={this.props.classes.button_accent}>追加</Button>
					</Box>
				</Box>

				<Grid>
					<div className={this.props.classes.list_box}>
							{/* 食材一覧 */}
						<List children={this.getListData().result}>
						</List>
					</div>
				</Grid>
			</div>
		);
	}
}

export default withStyles(style)(
	connect((state => state))(RefMaterials)
);