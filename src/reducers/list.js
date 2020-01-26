function list(state = [], action) {
  switch (action.type) {
    case 'LIST_RECEIVE_DATA':

      let menuList = [];
      let vege = ['野菜'];
      let fish = ['魚'];
      let meat = ['肉'];
      let dairy_eggs = ['乳製品・卵'];
      let bread_cereal = ['パン・シリアル'];
      let tofu_natto = ['豆腐・納豆'];
      let rice_powder = ['米・餅・粉物'];
      let noodles = ['麺類'];
      let dry_canned = ['乾物・缶詰'];

      if (action.menus && action.dishes) {

        // 献立に登録されている料理ID分の料理情報を集める
        Object.keys(action.menus).forEach(key => {
          action.menus[key].forEach(elm => {
            Object.keys(elm).forEach(key => {
              menuList.push(action.dishes[key]);
            })
          })
        });

        // まとめた料理情報から食材のカテゴリーごとに振り分ける
        menuList.forEach(elm => {
          // 献立に登録済みの料理が削除されていた場合のエラー回避
          if (elm !== undefined) {
            // 料理名の格納
            let dishName = elm.name;
            Object.keys(elm).forEach(key => {
              // 食材のみ配列を回す
              if (key === 'materials') {
                elm[key].forEach(material => {

                  if (material.category === "1") {
                    vege.push({
                      dish: dishName,
                      material: material.name,
                      quantity: material.quantity,
                    })
                  } else if (material.category === "2") {
                    fish.push({
                      dish: dishName,
                      material: material.name,
                      quantity: material.quantity,
                    })
                  } else if (material.category === "3") {
                    meat.push({
                      dish: dishName,
                      material: material.name,
                      quantity: material.quantity,
                    })
                  } else if (material.category === "4") {
                    dairy_eggs.push({
                      dish: dishName,
                      material: material.name,
                      quantity: material.quantity,
                    })
                  } else if (material.category === "5") {
                    bread_cereal.push({
                      dish: dishName,
                      material: material.name,
                      quantity: material.quantity,
                    })
                  } else if (material.category === "6") {
                    tofu_natto.push({
                      dish: dishName,
                      material: material.name,
                      quantity: material.quantity,
                    })
                  } else if (material.category === "7") {
                    rice_powder.push({
                      dish: dishName,
                      material: material.name,
                      quantity: material.quantity,
                    })
                  } else if (material.category === "8") {
                    noodles.push({
                      dish: dishName,
                      material: material.name,
                      quantity: material.quantity,
                    })
                  } else if (material.category === "9") {
                    dry_canned.push({
                      dish: dishName,
                      material: material.name,
                      quantity: material.quantity,
                    })
                  }
                })
              }
            })
          }
        })
      }

      return { vege, fish, meat, dairy_eggs, bread_cereal, tofu_natto, rice_powder, noodles, dry_canned }

    case 'LIST_RECIVE_ERROR':
      alert(action.message)
      break;

    default:
      return state
  }
}

export default list
