import {firebaseDb} from '../firebase/'

const ref = firebaseDb.ref('materials/');

// 食材データ取得
function loadMaterials() {
  return dispatch => {
    ref.off()
    ref.on('value',
      (snapshot) => {dispatch(loadMaterialsSuccess(snapshot))},
      (error) => {dispatch(loadMaterialsError(error))}
    )
  }
}

function loadMaterialsSuccess(snapshot){
  return {
    type: 'MATERIALS_RECEIVE_DATA',
    data: snapshot.val()
  }
}

function loadMaterialsError(error){
  return {
    type: 'MATERIALS_RECIVE_ERROR',
    message: error.message
  }
}

// ADD_MATERIAL
function addMaterial(data){
  const addref = firebaseDb.ref('materials/' + data.material);
  return dispatch => {
    addref.set({
      category: data.category
    })
    .catch(error => dispatch({
      type: 'ADD_MATERIAL_ERROR',
      message: error.message,
    }));
  }
}

// DELETE_Material
function deleteMaterial(key){
  return dispatch => {
    firebaseDb.ref('materials/' + key).remove()
    .catch(error => dispatch({
      type: 'DELETE_MATERIAL_ERROR',
      message: error.message,
    }));
  }
}

export default {
  loadMaterials,
  addMaterial,
  deleteMaterial,
}