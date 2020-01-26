function materials(state = [], action) {
  switch (action.type) {
    case 'MATERIALS_RECEIVE_DATA':
      let materials = [];

      if (action.data) {

        let data = action.data;
        let name;

        for (let key in data) {
          name = key;

          for (let nest in data[key]) {
            materials.push({
              key: name,
              category: data[key][nest]
            })
          }
        }
      }
      return [...materials]

    case 'MATERIALS_RECIVE_ERROR':
      alert(action.message)
      break;

    case 'DELETE_MATERIAL_ERROR':
      return state

    default:
      return state
  }
}

export default materials
