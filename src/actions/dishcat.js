import {firebaseDb} from '../firebase/'

const catref = firebaseDb.ref('dish_categories/');

// 料理カテゴリ取得
function getDishCat(){
  return dispatch => {
    catref.off()
    catref.on('value',
      (snapshot) => {dispatch(getDishCatSuccess(snapshot))},
      (error) => {dispatch(getDishCatError(error))}
    )
  }
}
function getDishCatSuccess(snapshot){
  return {
    type: 'DISH_CATEGORY_DATA',
    data: snapshot.val()
  }
}

function getDishCatError(error){
  return {
    type: 'DISH_CATEGORY_ERROR',
    message: error.message
  }
}

export default {
  getDishCat
}