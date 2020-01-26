import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DialogContent from '@material-ui/core/DialogContent';
import EntryMaterials from './EntryMaterials/EntryMaterials';
import SelectedMaterials from './SelectedMaterials/SelectedMaterials';
import dishes from '../../../actions/dishes';

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
  align_form: {
    paddingTop: "5px",
    paddingBottom: "5px",
  }
}

class AddDish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      dishName: '',
      dishCat: '',
      materialData: []
    }
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updateMaterialData = this.updateMaterialData.bind(this);
    this.deleteMaterial = this.deleteMaterial.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCat = this.onChangeCat.bind(this);
    this.addDish = this.addDish.bind(this);
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
  // 追加された食材情報をstateに設定
  updateMaterialData(name, quantity, category) {
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
  deleteMaterial(i) {
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

  // 料理の登録
  addDish() {
    let name = this.state.dishName;
    let category = this.state.dishCat;
    let materialResult = this.state.materialData;

    if (!name || !category || materialResult.length === 0) {
      alert("料理名とカテゴリ、1つ以上の食材が必須です");
      return;
    }
    if(name == false){
      alert('料理名をスペースにすることはできません');
      return;
    }
    let data = {
      dishName: name,
      dishCat: category,
      materialData: materialResult
    }
    const { dispatch } = this.props;
    dispatch(dishes.addDishe(data))
    
    // 初期化
    this.setState({
      open: false,
      dishName: '',
      dishCat: '',
      materialData: []
    });
  }
  handleClickOpen() {
    this.setState({
      open: true
    })
  };
  handleClose() {
    this.setState({
      open: false
    })
  };

  render() {
    return (
      <div className="block">
        <Typography className={this.props.classes.headline}>料理登録</Typography>

        {/* 登録ボタン */}
        <Button onClick={this.handleClickOpen} size="large" variant="outlined" className={this.props.classes.button_accent}>登録</Button>

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

          {/* 追加された食材のリスト */}
          <SelectedMaterials materialData={this.state.materialData} deleteMaterial={this.deleteMaterial} />

          {/* ボタン */}
          <DialogActions className={this.props.classes.button_align} >
            <Button onClick={this.addDish} size="large" variant="outlined" className={this.props.classes.button_accent}>保存</Button>
            <Button onClick={this.handleClose} size="large" variant="outlined" color="secondary">キャンセル</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(style)(
  connect((state => state))(AddDish)
);