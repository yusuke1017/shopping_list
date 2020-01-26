function dishcat(state = [], action){
    switch (action.type) {
      case 'DISH_CATEGORY_DATA':
        let dishcat = []
        if (action.data){
          Object.keys(action.data).forEach(key =>{
            dishcat.push({
              key: key,
              value: action.data[key]
            })
          });
        }
        return [...dishcat]
  
      case 'DISH_CATEGORY_ERROR':
        alert(action.message)
        break;
  
      default:
        return state
    }
  }
  
  export default dishcat
  