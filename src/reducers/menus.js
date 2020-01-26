function menus(state = [], action) {
  switch (action.type) {
    case 'MENUS_RECEIVE_DATA':
      return [action.data]

    case 'MENUES_RECIVE_ERROR':
      alert(action.message)
      break;

    case 'DELETE_MENU_ERROR':
      return state

    default:
      return state
  }
}

export default menus
