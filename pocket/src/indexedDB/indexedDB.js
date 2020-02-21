const localForage = require('localforage')

let storeForIncome = localForage.createInstance({
    storeName: "income_list"
})

let storeForSpend = localForage.createInstance({
    storeName: "spend_list"
})

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

export async function addIncome(income) {
    // console.log(cost)
    let tempNumber = parseFloat(income.Number)
    let affair = {
        creat_at: Date(),
        update_at: Date(),
        delete_at: "",
        type: '+',
        data: {
            Title: income.Title,
            Number: tempNumber,
            Date: income.Date,
            Type: income.Type,
            Extra: income.Extra
        },
    }
    // await localForage.config({storeName: "income_list"})
    // console.log(localForage.config())
    await storeForIncome.length().then((numberOfKeys) => {
        storeForIncome.setItem((numberOfKeys + 1).toString(), affair).then(() => {
            // console.log("done")
        }).catch(e => {
            console.log(e)
        })
    }).catch((err) => {
        console.log(err);
    });
}

export async function addSpend(cost) {
    // console.log(cost)
    let tempNumber = parseFloat(cost.Number) * -1;
    let affair = {
        creat_at: Date(),
        update_at: Date(),
        delete_at: "",
        type: '-',
        data: {
            Title: cost.Title,
            Number: tempNumber,
            Date: cost.Date,
            Type: cost.Type,
            Extra: cost.Extra
        },
    }
    // await localForage.config({storeName: "spend_list"})
    await storeForSpend.length().then((numberOfKeys) => {
        storeForSpend.setItem((numberOfKeys + 1).toString(), affair).then(() => {
            // console.log("done")
        }).catch(e => {
            console.log(e)
        })
    }).catch((err) => {
        console.log(err);
    });
}

export async function modifySpend(spend,key,creatAt) {
    // spend.Number = spend.Number.replace(/-/g,"");
    // console.log(spend.Number)
    let tempNumber = parseFloat(spend.Number) * -1;
    let affairs = {
        creat_at: creatAt,
        update_at: Date(),
        delete_at: "",
        type: '-',
        data: {
            Title: spend.Title,
            Number: tempNumber,
            Date: spend.Date,
            Type: spend.Type,
            Extra: spend.Extra
        },
    };
    await storeForSpend.setItem(key,affairs).then(()=>{
        console.log("done")
    }).catch(e =>{
        console.log(e)
    })
}

export async function modifyIncome(spend,key,creatAt) {
    // spend.Number = spend.Number.replace(/-/g,"");
    // console.log(spend.Number)
    let tempNumber = parseFloat(spend.Number)
    let affairs = {
        creat_at: creatAt,
        update_at: Date(),
        delete_at: "",
        type: '+',
        data: {
            Title: spend.Title,
            Number: tempNumber,
            Date: spend.Date,
            Type: spend.Type,
            Extra: spend.Extra
        },
    };
    await storeForIncome.setItem(key,affairs).then(()=>{
        console.log("done")
    }).catch(e =>{
        console.log(e)
    })
}

export async function getAllAffairs() {
    let affairs = []
    let tempKey = 0
    // storeForSpend.config({storeName: "spend_list"})
    await storeForSpend.iterate((value, key) => {
        affairs[tempKey] = value
        affairs[tempKey].key = key
        tempKey++
        // console.log(tempKey)
        // console.log([key, value]);
    }).then(() => {
        // console.log(affairs)
        // return affairs
    }).catch((err) => {
        console.log(err)
    })
    await storeForIncome.iterate((value, key) => {
        affairs[tempKey] = value
        affairs[tempKey].key = key
        tempKey++
        // console.log(tempKey)
    }).then(() => {
        // return
    }).catch((err) => {
        console.log(err)
    })
    // console.log(affairs)
    return affairs
    // return affairs
}

