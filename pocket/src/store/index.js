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
            return state.AffairsData.sort((a, b) => {
                if (a.data.Date.getTime() > b.data.Date.getTime()) {
                    // console.log(a.data.Date.getTime())
                    // console.log(b.data.Date.getTime())
                    // console.log(a.data.Date.getTime()- b.data.Date.getTime())
                    return -1;
                } else {
                    return 1;
                }
            })
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
