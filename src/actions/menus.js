import {firebaseDb} from '../firebase/'

const ref = firebaseDb.ref('menus/');

// 献立データ取得
function loadMenus() {
  return dispatch => {
    ref.off()
    ref.on('value',
      (snapshot) => {dispatch(loadMenusSuccess(snapshot))},
      (error) => {dispatch(loadMenusError(error))}
    )
  }
}

function loadMenusSuccess(snapshot){
  return {
    type: 'MENUS_RECEIVE_DATA',
    data: snapshot.val()
  }
}

function loadMenusError(error){
  return {
    type: 'MENUS_RECIVE_ERROR',
    message: error.message
  }
}

// ADD_MENU
function addMenu(data){
  const addref = firebaseDb.ref('menus/');
  return dispatch => {
    addref.set(data)
    .catch(error => dispatch({
      type: 'ADD_MENU_ERROR',
      message: error.message,
    }));
  }
}

export default {
  loadMenus,
  addMenu,
}