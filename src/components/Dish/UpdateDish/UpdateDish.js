import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import EntryMaterials from '../AddDish/EntryMaterials/EntryMaterials';
import SelectedMaterials from '../AddDish/SelectedMaterials/SelectedMaterials';
import dishes from '../../../actions/dishes';

const style = {
  input_box: {
    marginRight: "15px",
    minWidth: "120px"
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
  align_form: {
    paddingTop: "5px",
    paddingBottom: "5px",
  }
}

class UpdateDish extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: this.props.id,
      dishName: this.props.name,
      dishCat: this.props.category,
      materialData: this.props.materialData,
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.updateMaterialData = this.updateMaterialData.bind(this);
    this.deleteMaterial = this.deleteMaterial.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCat = this.onChangeCat.bind(this);
    this.updateDish = this.updateDish.bind(this);
  }

  onChangeName(e) {
    this.setState({
      dishName: e.target.value
    })
  }
  onChangeCat(e) {
    this.setState({
      dishCat: e.target.value
    })
  }
  // 更新された食材情報をstateに設定
  updateMaterialData(name,quantity,category){
		let newData = this.state.materialData.slice();
		let data = {
      name: name,
      quantity: quantity,
      category: category
		}
		newData.unshift(data);
		this.setState({
			materialData: newData,
    })
  }
  // 削除を選択された食材をstateから削除
  deleteMaterial(i){
    let newData = this.state.materialData.slice();
    delete newData[i];

    // 配列内の空の値を除く
    let check = newData.filter(value => {
      return value !== ""
    })
    this.setState({
      materialData: check
    })
  }

  // 料理情報の更新
  updateDish() {
    let name = this.state.dishName;
    let category = this.state.dishCat;
    let materialResult = this.state.materialData;
    let id = this.state.id;
    
    if (!name || !category || materialResult.length === 0) {
      alert("料理名とカテゴリ、1つ以上の食材が必須です");
      return;
    }
    if(name == false){
      alert('料理名をスペースにすることはできません');
      return;
    }
    let data = {
      id: id,
      dishName: name,
      dishCat: category,
      materialData: materialResult
    }
    const { dispatch } = this.props;
    dispatch(dishes.updateDish(data))
    
    this.setState({
      open: false,
    });
  }
  handleClickOpen() {
    this.setState({
      open: true
    })
  };
  handleClose() {
    this.setState({
      open: false,
      dishName: this.props.name,
      dishCat: this.props.category,
      materialData: this.props.materialData,
    })
  };

  render() {
    return (
      <>
        <IconButton edge="end" aria-label="edit" onClick={this.handleClickOpen}>
          <EditIcon />
        </IconButton>

        {/* 1層目 ダイアログフォーム */}
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" maxWidth="lg" fullWidth={true}>

          <DialogContent>
            <Box display="flex" component="section" alignItems="center" flexWrap="wrap" alignContent="flex-start">

            {/* 料理名入力 */}
            <Box className={this.props.classes.align_form}>
            <TextField onChange={this.onChangeName} value={this.state.dishName} id="outlined-basic" label="料理名" variant="outlined" className={this.props.classes.input_box} color="secondary" />
            </Box>

            {/* 料理カテゴリドロップダウン */}
            <Box className={this.props.classes.align_form}>
            <FormControl id="add-form" color="secondary" variant="outlined" className={this.props.classes.input_box}>
              <InputLabel id="simple-select-outlined-label">カテゴリ</InputLabel>
              <Select
                variant="outlined"
                labelId="simple-select-outlined-label"
                id="simple-select-outlined"
                value={this.state.dishCat}
                onChange={this.onChangeCat}
              >
                {this.props.dishcat.map(category => <MenuItem key={category.key} value={category.key}>{category.value}</MenuItem>)}
              </Select>
            </FormControl>
            </Box>
          </Box>
          </DialogContent>

          {/* 2層目 食材エリア */}
          <DialogContent dividers={true}>
            <EntryMaterials updateMaterialData={this.updateMaterialData} />
          </DialogContent>

          {/* 登録された食材のリスト */}
          <SelectedMaterials materialData={this.state.materialData} deleteMaterial={this.deleteMaterial} />

          {/* ボタン */}
          <DialogActions className={this.props.classes.button_align} >
            <Button onClick={this.updateDish} size="large" variant="outlined" className={this.props.classes.button_accent}>保存</Button>
            <Button onClick={this.handleClose} size="large" variant="outlined" color="secondary">キャンセル</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withStyles(style)(
  connect((state => state))(UpdateDish)
);