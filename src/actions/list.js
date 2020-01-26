import { firebaseDb } from '../firebase'

const menus = firebaseDb.ref('menus/');
const dishes = firebaseDb.ref('dishes/');

// 料理、献立情報を取得
function loadLists() {
  return dispatch => {
    menus.off()
    menus.on('value',
      (snapshot) => {
        const menusData = snapshot;
        dishes.off()
        dishes.on('value',
          (snapshot) => {
            const dishesData = snapshot;
            dispatch(loadListSuccess(menusData,dishesData))
          },
          (error) => { dispatch(loadListError(error)) }
        )
      },
      (error) => { dispatch(loadListError(error)) }
    )
  }
}

function loadListSuccess(menusData,dishesData) {
  return {
    type: 'LIST_RECEIVE_DATA',
    menus: menusData.val(),
    dishes: dishesData.val()
  }
}

function loadListError(error) {
  return {
    type: 'LIST_RECIVE_ERROR',
    message: error.message
  }
}

export default {
  loadLists,
}