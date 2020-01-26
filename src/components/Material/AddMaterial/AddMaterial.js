import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import materials from '../../../actions/materials';

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
  align_form: {
    paddingTop: "5px",
    paddingBottom: "5px",
  }
}

class AddMaterial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      material: '',
      category: '',
    }
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCat = this.onChangeCat.bind(this);
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

  addMaterial() {
    let material_name = this.state.material;
    let material_cat = this.state.category;
    let regData = new RegExp(/[!"#$%&'()*+\-.,/:;<=>?@[\\\]^_`{|}~]/g);

    if (material_name === "" || material_cat === "") {
      alert('食材名とカテゴリは必須項目です');
      return;
    }
    
    if (regData.test(material_name)) {
      alert('食材名に記号は使用できません');
      return;
    }

    if(material_name == false){
      alert('食材名をスペースにすることはできません');
      return;
    } 

    let data = {
      material: material_name,
      category: material_cat
    };
    const { dispatch } = this.props;
    dispatch(materials.addMaterial(data))
    // 初期化
    this.setState({
      material: '',
      category: '',
    });
  }


  render() {
    return (
      <div className="block">
        <Typography className={this.props.classes.headline}>食材登録</Typography>

        <Box display="flex" component="section" alignItems="center" flexWrap="wrap" alignContent="flex-start">

          {/* 食材名入力 */}
          <Box className={this.props.classes.align_form}>
            <TextField onChange={this.onChangeName} value={this.state.material} id="outlined-basic" label="食材名" variant="outlined" className={this.props.classes.input_box} color="secondary" />
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

          {/* 追加ボタン */}
          <Box className={this.props.classes.align_form}>
            <Button onClick={this.addMaterial} size="large" variant="outlined" className={this.props.classes.button_accent}>追加</Button>
          </Box>
        </Box>
      </div>
    );
  }
}

export default withStyles(style)(
  connect((state => state))(AddMaterial)
);