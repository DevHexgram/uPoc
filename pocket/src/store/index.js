import Vue from 'vue'
import Vuex from 'vuex'
import {addSpend, getAllAffairs} from "../indexedDB/indexedDB";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        AffairsData: []
    },
    mutations: {},
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
    },
    modules: {}
})
