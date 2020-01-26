import {firebaseDb} from '../firebase/'

const catref = firebaseDb.ref('material_categories/');

// 食材カテゴリー取得
function getMaterialCat(){
  return dispatch => {
    catref.off()
    catref.on('value',
      (snapshot) => {dispatch(getMaterialCatSuccess(snapshot))},
      (error) => {dispatch(getMaterialCatError(error))}
    )
  }
}
function getMaterialCatSuccess(snapshot){
  return {
    type: 'MATERIALS_CATEGORY_DATA',
    data: snapshot.val()
  }
}

function getMaterialCatError(error){
  return {
    type: 'MATERIALSCATEGORY_ERROR',
    message: error.message
  }
}

export default {
  getMaterialCat
}