import React, { Component } from 'react';
import { connect } from 'react-redux'
import AddMaterial from './AddMaterial/AddMaterial';
import ShowMaterial from './ShowMaterial/ShowMaterial';
import material from '../../actions/materials'
import materialcat from '../../actions/materialcat'


class Material extends Component {

  // 食材と食材カテゴリの取得
  componentDidMount(){
    const {dispatch} = this.props;
    dispatch(material.loadMaterials());
    dispatch(materialcat.getMaterialCat());
  }

  render() {
    // 食材と食材カテゴリ設定
    const {materials} = this.props;
    const {materialcat} = this.props.materialcat;
    return (
      <>
        <AddMaterial  materialcat={materialcat}/>
        <ShowMaterial materials={materials} materialcat={materialcat}/>
      </>
    );
  }

}

export default connect((state => state))(Material);