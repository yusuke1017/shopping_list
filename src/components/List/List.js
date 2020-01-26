import React, { Component } from 'react';
import { connect } from 'react-redux';
import ShowList from './ShowList/ShowList';
import list from '../../actions/list';

class List extends Component {

  componentDidMount(){
    const {dispatch} = this.props;
    dispatch(list.loadLists());
  }

  render() {
    const {list} = this.props;
    return (
      <>
        <ShowList list={list}/>
      </>
    );
  }
}

export default connect((state => state))(List);