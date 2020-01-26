import React, { Component } from 'react';
import { connect } from 'react-redux'
import AddDish from './AddDish/AddDish';
import ShowDish from './ShowDish/ShowDish';
import dish from '../../actions/dishes'
import dishcat from '../../actions/dishcat'

class Dish extends Component {

  // 料理と料理カテゴリの取得
  componentDidMount(){
    const {dispatch} = this.props;
    dispatch(dish.loadDishes());
    dispatch(dishcat.getDishCat());
  }

  render() {
    // 料理と料理カテゴリの設定
    const {dishes} = this.props;
    const {dishcat} = this.props.dishcat;
    return (
      <>
        <AddDish dishcat={dishcat}/>
        <ShowDish dishes={dishes} dishcat={dishcat} />
      </>
    );
  }

}

export default connect((state => state))(Dish);