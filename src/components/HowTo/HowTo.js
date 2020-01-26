import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  app_bar: {
    position: 'relative',
  },
  head_title: {
    flex: 1,
  },
  title: {
    marginBottom: "15px",
  },
  step: {
    marginBottom: "15px",
  },
  howto_cap: {
    maxWidth: "800px",
    width: "100%",
    marginBottom: "15px",
  },
  divider: {
    marginBottom: "15px",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function HowTo() {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <span>使い方</span>
      <IconButton variant="contained" color="secondary" onClick={handleClickOpen}>
        <HelpOutlineRoundedIcon />
      </IconButton>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.app_bar}>
          <Container maxWidth="lg">
            <Toolbar>
              <Typography className={classes.head_title}>
                使い方
            </Typography>
              <Button autoFocus color="inherit" onClick={handleClose}>
                閉じる
            </Button>
            </Toolbar>
          </Container>
        </AppBar>
        <Container maxWidth="lg" className="container">
          <div>
            <Typography>
              <Box fontSize={18} className={classes.title}>「SHOPPING LIST」とは</Box>
              <Box className={classes.step}>献立を登録することで必要な食材をリストアップし、買い物を手助けするためのアプリです。</Box>
              <Divider className={classes.divider} />
              <Box fontSize={18} className={classes.title}>STEP1 料理の登録</Box>
              <Box className={classes.step}>料理名とカテゴリ、さらに料理に必要な食材を登録しておきます。</Box>
              <Box><img src={require('../static/img/howto_dish.png')} alt="料理画面の使い方" className={classes.howto_cap} /></Box>
              <Divider className={classes.divider} />
              <Box fontSize={18} className={classes.title}>STEP2 献立の登録</Box>
              <Box className={classes.step}>月曜日〜日曜日までの最大7日分の献立を登録できます。</Box>
              <Box><img src={require('../static/img/howto_menu.png')} alt="献立画面の使い方" className={classes.howto_cap} /></Box>
              <Divider className={classes.divider} />
              <Box fontSize={18} className={classes.title}>STEP3 買い物リストの確認</Box>
              <Box className={classes.step}>献立に登録された料理に紐づく食材のチェックリストが表示されます。買い間違いしないように購入したものにチェックを入れていきましょう。</Box>
              <Box><img src={require('../static/img/howto_list.png')} alt="買い物リスト画面の使い方" className={classes.howto_cap} /></Box>
            </Typography>
          </div>
        </Container>
      </Dialog>
    </>
  );
}

export default HowTo;
