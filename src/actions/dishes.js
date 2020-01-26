import {firebaseDb} from '../firebase/'

const ref = firebaseDb.ref('dishes/');

// 料理データ取得
function loadDishes() {
  return dispatch => {
    ref.off()
    ref.on('value',
      (snapshot) => {dispatch(loadDishesSuccess(snapshot))},
      (error) => {dispatch(loadDishesError(error))}
    )
  }
}

function loadDishesSuccess(snapshot){
  return {
    type: 'DISHES_RECEIVE_DATA',
    data: snapshot.val()
  }
}

function loadDishesError(error){
  return {
    type: 'DISHES_RECIVE_ERROR',
    message: error.message
  }
}

// ADD_DISH
function addDishe(data){
  const addref = firebaseDb.ref('dishes/');
  return dispatch => {
    addref.push({
      name: data.dishName,
      category: data.dishCat,
      materials: data.materialData
    })
    .catch(error => dispatch({
      type: 'ADD_DISH_ERROR',
      message: error.message,
    }));
  }
}
// // UPDATE_DISH
function updateDish(data){
  const addref = firebaseDb.ref('dishes/' + data.id);
  return dispatch => {
    addref.set({
      name: data.dishName,
      category: data.dishCat,
      materials: data.materialData
    })
    .catch(error => dispatch({
      type: 'UPDATE_DISH_ERROR',
      message: error.message,
    }));
    
  }
}

// DELETE_Dishe
function deleteDish(key){
  return dispatch => {
    firebaseDb.ref('dishes/' + key).remove()
    .catch(error => dispatch({
      type: 'DELETE_DISH_ERROR',
      message: error.message,
    }));
  }
}

export default {
  loadDishes,
  addDishe,
  deleteDish,
  updateDish,
}