const localForage = require('localforage')

// localForage.config({
//     name: 'spendList',
//     storeName: '表名或集合名',
//     driver: '优先使用的存储方式（indexedDB || webSQL || localStorage）',
//     size: 4980736,  // 数据库大小，只在使用webSQL时起作用
//     version: 1.0,  // 数据库版本号
//     description: '数据库描述'
// });

// const mlf = {
//     install(Vue, options) {
//         Vue.prototype.$mlf = new Vue({
//             name: 'mlf',
//             methods: {
//
//             },
//         })
//     }
// }
//
// export default mlf

export async function addSpend(cost) {
    console.log(cost)
    let affair = {
        creat_at: Date(),
        update_at: Date(),
        delete_at: "",
        type: '-',
        data: {
            Title: cost.Title,
            Number: '-' + cost.Number,
            Date: cost.Date,
            Type: cost.Type,
            Extra: cost.Extra
        },
    }
    localForage.config({storeName: "spend_list"})
    await localForage.length().then((numberOfKeys) => {
        localForage.setItem((numberOfKeys + 1).toString(), affair).then(() => {
            console.log("done")
        }).catch(e => {
            console.log(e)
        })
    }).catch((err) => {
        console.log(err);
    });
}

export async function getAllAffairs() {
    let affairs = []
    let tempKey = 0
    localForage.config({storeName: "spend_list"})
    return await localForage.iterate((value, key) => {
        affairs[tempKey] = value
        affairs[tempKey].key = key
        tempKey++
        // console.log([key, value]);
    }).then(() => {
        // console.log(affairs)
        return affairs
    }).catch((err) => {
        console.log(err)
    })
    // return affairs
}

