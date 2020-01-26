function dishes(state = [], action) {
  switch (action.type) {
    case 'DISHES_RECEIVE_DATA':
      let dishes = [];
      let id = '';
      let name = '';
      let category = '';
      let materials = [];

      if (action.data) {
        let data = action.data;
        for (let key in data) {
          id = key;
          for(let nest in data[key]){
            if(nest === "name"){
              name = data[key][nest]
            }else if(nest === "category"){
              category = data[key][nest]
            }else if(nest === "materials"){
              materials = data[key][nest]
            }
          }
          dishes.push({
            id: id,
            name: name,
            category: category,
            materials: materials
          });
        }
      }
      return [...dishes]

    case 'DISHES_RECIVE_ERROR':
      alert(action.message)
      break;

    case 'DELETE_DISH_ERROR':
      return state

    default:
      return state
  }
}

export default dishes
