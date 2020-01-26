import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Typography } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import FastfoodIcon from '@material-ui/icons/Fastfood';

const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: "15px",
      }
    }
  }
});

const style = {
  headline: {
    marginBottom: "15px",
    fontSize: "20px",
  },
  material_category: {
    marginBottom: "5px",
    marginLeft: "10px",
    fontWeight: "bold",
  },
  root: {
    width: '100%',
    marginBottom: "15px",
  },
  check_list_on: {
    backgroundColor: "#3f404c4d",
  },
  check_list_off: {
    backgroundColor: "#fff",
  },
}

class ShowList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: '',
    }
    this.handleToggle = this.handleToggle.bind(this);
    this.getList = this.getList.bind(this);
  }

  // リストクリックとチェックボックスを連動させる
  handleToggle(e) {
    const checked = this.state.checked;
    const value = e.currentTarget.dataset.value;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    this.setState({
      checked: newChecked
    })
  };

  // リストデータからチェックリストの作成
  getList() {
    let result = [];
    let data = this.props.list;
    let matList = [];
    let matSliced = [];
    let matCat = "";
    let i = 0;

    // リストデータを回す
    Object.keys(data).forEach(key => {
      matList = data[key];
      // 食材情報が無い配列を省く
      if (matList.length > 1) {
        // 配列の先頭にある食材カテゴリ名を取得
        matSliced = matList.slice();
        matCat = matSliced.shift().toString();
        // 食材名順にソート
        matSliced.sort((x, y) => {
          if (x.material > y.material) {
            return 1;
          } else {
            return -1;
          }
        })
        result.push(
          <Grid item xs={12} sm={6} md={4}>
            <Typography className={this.props.classes.material_category}>{matCat}</Typography>
            <Paper>
              <List className={this.props.classes.root}>
                {
                  matSliced.map(elm => {
                    let key = i++;
                    let value = key.toString();
                    return (<>
                      <ListItem onClick={this.handleToggle} key={value} data-value={value} role={undefined} dense button className={(this.state.checked.indexOf(value) !== -1 ? this.props.classes.check_list_on : this.props.classes.check_list_off)}>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={this.state.checked.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple
                          />
                        </ListItemIcon>
                        <ListItemText primary={elm.material + '：' + elm.quantity} />
                        <ListItemSecondaryAction>
                          <MuiThemeProvider theme={theme}>
                            <Tooltip title={elm.dish} placement="left">
                              <FastfoodIcon />
                            </Tooltip>
                          </MuiThemeProvider>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </>)
                  })}
              </List>
            </Paper>
          </Grid>
        )
      }
    })

    if (result.length === 0) {
      result.push(<Grid item xs={12} sm={6} md={4}>
        <Paper>
          <List className={this.props.classes.root}>
            <ListItem dense>
              <ListItemText primary="献立の登録がありません" />
            </ListItem>
          </List>
        </Paper>
      </Grid>)
    }
    return result
  }

  render() {
    return (
      <>
        <Typography className={this.props.classes.headline}>買い物リスト</Typography>

        <Grid
          container
          spacing={3}
          direction="row"
          justify="flex-start"
          alignItems="stretch"
        >
          {this.getList()}
        </Grid>
      </>
    );
  }
}

export default withStyles(style)(
  connect((state => state))(ShowList)
);