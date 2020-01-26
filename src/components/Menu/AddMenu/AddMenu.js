import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

const style = {
  input_box: {
    marginRight: "15px",
    minWidth: "120px"
  },
  headline: {
    marginBottom: "15px",
    fontSize: "20px",
  },
  list_box: {
    maxHeight: "600px",
    overflow: "auto",
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
    '&:hover': {
      backgroundColor: "#fff",
      color: "#FE6726"
    }
  }
}

class AddMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      filterCat: "",
      menuList: this.props.menuData,
    }
    this.updateDishData = this.updateDishData.bind(this);
    this.selectDish = this.selectDish.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.deleteMenu = this.deleteMenu.bind(this);
  }
  handleClickOpen() {
    this.setState({
      open: true,
      menuList: this.props.menuData,
    })
  };
  handleClose() {
    this.setState({
      open: false
    })
  };

  // 料理の追加
  selectDish(e) {
    let newData = this.state.menuList.slice();
    newData.push({
      [e.currentTarget.dataset.id]: e.currentTarget.dataset.name,
    })
    this.setState({
      menuList: newData
    })
  }

  // 料理データの生成
  getListData() {
    // 全データ取得
    const dishes = this.props.dishes;
    let result = [];

    if (dishes === null || dishes.length === 0) {
      return [<ListItem key="0"><ListItemText primary="Loading..." /></ListItem>];
    }

    // デフォルト、あるいはカテゴリ「全て」を選択時は全データをresultに格納する
    if (this.state.filterCat === "" || this.state.filterCat === "0") {
      for (let i = 0; i < dishes.length; i++) {
        result.push(<><ListItem key={dishes[i]['id']} data-id={dishes[i]['id']} data-name={dishes[i]['name']} button onClick={this.selectDish}>
          <ListItemText primary={dishes[i]['name']} />
        </ListItem>
          <Divider />
        </>
        )
      }
    } else {
      for (let i = 0; i < dishes.length; i++) {
        if (this.state.filterCat === dishes[i]['category']) {
          result.push(<><ListItem key={dishes[i]['id']} data-id={dishes[i]['id']} data-name={dishes[i]['name']} button onClick={this.selectDish}>
            <ListItemText primary={dishes[i]['name']} />
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

  // カテゴリーデータの生成
  getOptionData() {
    const cat_data = this.props.dishcat.slice();
    if (!cat_data[4]) {
      cat_data.push({
        key: "0",
        value: "全て"
      });
    }
    let result = [];
    if (cat_data === null || cat_data.length === 0) {
      return [<MenuItem key="0" value="">no data</MenuItem>];
    } else {
      for (let i = 0; i < cat_data.length; i++) {
        result.push(<MenuItem key={cat_data[i]['key']} value={cat_data[i]['key']}>{cat_data[i]['value']}</MenuItem>
        )
      }
    }
    return result;
  }

  // 選択済み料理の一覧表示
  getSelectedData() {
    let result = [];
    let newData = this.state.menuList.slice();

    for (let i = 0; i < newData.length; i++) {
      for (let key in newData[i]) {
        result.push(<><ListItem key={i} >
          <ListItemText primary={newData[i][key]} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" onClick={() => this.deleteMenu(i)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
          <Divider />
        </>)

      }
    }
    if (result === null || result.length === 0) {
      result.push(<ListItem key="0"><ListItemText primary="料理を登録しましょう" /></ListItem>);
    }
    return result;
  }

  // 選択済み料理の登録削除
  deleteMenu(i) {
    let newData = this.state.menuList.slice();
    delete newData[i];
    // 配列内の空の値を除く
    let check = newData.filter(value => {
      return value !== ""
    })
    this.setState({
      menuList: check
    })
  }

  // 選択した料理情報を親のMenuコンポーネントに渡す
  updateDishData() {
    // 配列内の空の値を除く
    let check = this.state.menuList.filter(value => {
      return value !== ""
    })
    if (check.length > 0) {
      this.props.updateData(this.state.menuList, this.props.day);
    } else {
      alert("料理が選択されていません");
      return;
    }
    this.setState({
      open: false,
    })
  }

  onFilter(e) {
    this.setState({
      filterCat: e.target.value
    });
  }

  render() {
    return (
      <>
        {/* 料理登録ダイアログ表示ボタン */}
        <IconButton onClick={this.handleClickOpen} className={this.props.classes.material_icon} size="medium" aria-label="Material">
          <FastfoodIcon />
        </IconButton>

        {/* 料理登録ダイアログ */}
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" maxWidth="lg" fullWidth={true}>
          <DialogContent>
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

            {/* 料理情報一覧 */}
            <Grid>
              <List className={this.props.classes.list_box}>
                {this.getListData()}
              </List>
            </Grid>
          </DialogContent>

          {/* 選択済み料理情報一覧 */}
          <DialogContent dividers={true}>
            <Grid>
              <List>
                {this.getSelectedData()}
              </List>
            </Grid>
          </DialogContent>

          {/* ボタン */}
          <DialogActions className={this.props.classes.button_align} >
            <Button onClick={this.updateDishData} size="large" variant="outlined" className={this.props.classes.button_accent}>保存</Button>
            <Button onClick={this.handleClose} size="large" variant="outlined" color="secondary">キャンセル</Button>
          </DialogActions>

        </Dialog>
      </>
    );
  }
}

export default withStyles(style)(
  connect((state => state))(AddMenu)
);