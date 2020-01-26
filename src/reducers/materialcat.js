function materialcat(state = [], action){
  switch (action.type) {
    case 'MATERIALS_CATEGORY_DATA':
      let materialcat = []
      if (action.data){
        Object.keys(action.data).forEach(key =>{
          materialcat.push({
            key: key,
            value: action.data[key]
          })
        });
      }
      return [...materialcat]

    case 'MATERIALSCATEGORY_ERROR':
      alert(action.message)
      break;

    default:
      return state
  }
}

export default materialcat
