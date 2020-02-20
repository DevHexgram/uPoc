import Vue from 'vue'
import Vuex from 'vuex'
import {addIncome, addSpend, getAllAffairs} from "../indexedDB/indexedDB";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        AffairsData: []
    },
    mutations: {},
    getters: {
        AffairSorted: state => {
            let tempAffairs = state.AffairsData.sort((a, b) => {
                if (a.data.Date.getTime() > b.data.Date.getTime()) {
                    // console.log(a.data.Date.getTime())
                    // console.log(b.data.Date.getTime())
                    // console.log(a.data.Date.getTime()- b.data.Date.getTime())
                    return -1;
                } else {
                    return 1;
                }
            })
            // console.log(tempAffairs)
            let result = []
            let length = tempAffairs.length
            let key = 0
            // console.log(length)
            for (let i = 0; i < length - 1; i++) {
                // console.log("key:", key)
                // console.log("i:", i)
                // console.log(result)
                if (tempAffairs[i].data.Date.getMonth() !== tempAffairs[i + 1].data.Date.getMonth()) {
                    result.push(tempAffairs.slice(key, i+1)) //slice包含start,不包含end
                    key = i + 1
                }
            }
            result.push(tempAffairs.slice(key , length))
            // console.log(result)
            return result
        },
    },
    actions: {
        async refresh(context) {
            await getAllAffairs().then((value) => {
                context.state.AffairsData = value
            })
        },
        async addCost(context, payload) {
            // console.log(payload.cost)
            await addSpend(payload.cost)
            await context.dispatch("refresh")
        },
        async addIncome(context, payload) {
            await addIncome(payload.income)
            await context.dispatch("refresh")
        },
    },
    modules: {}
})
