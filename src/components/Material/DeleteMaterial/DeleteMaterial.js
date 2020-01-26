import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import materials from '../../../actions/materials';

const style = {
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
	}
  }

class DeleteMaterial extends Component {

	constructor(props) {
		super(props);
		this.state = {
			open: false,
		}
		this.handleClickOpen = this.handleClickOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.doDeleteMaterial = this.doDeleteMaterial.bind(this);
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

	doDeleteMaterial(key){
    const { dispatch } = this.props;
		dispatch(materials.deleteMaterial(this.props.name));
		this.setState({
			open: false
		})
	}

	render() {
		return (
			<>
				<IconButton edge="end" aria-label="delete" onClick={this.handleClickOpen}>
					<DeleteIcon />
				</IconButton>

				<Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">{this.props.name}を削除しますか</DialogTitle>

					<DialogActions className={this.props.classes.button_align} >
						<Button onClick={this.doDeleteMaterial} size="large" variant="outlined" className={this.props.classes.button_accent}>実行</Button>
						<Button onClick={this.handleClose} size="large" variant="outlined" color="secondary">キャンセル</Button>
					</DialogActions>
				</Dialog>
			</>
		);
	}
}

export default withStyles(style)(
	connect((state => state))(DeleteMaterial)
  );