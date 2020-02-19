<template>
    <div>
        <van-cell-group :border="true">
            <van-cell
                    :border="true"
                    style="background-color: RGBA(62,237,231,0.1)"
                    icon="tosend"
                    :title="printDifferentMonth(0)"
            ></van-cell>
            <div v-for="(Affair,index) in Affairs" v-bind:key="Affair.creat_at">
                <!--            <div>{{Affair}}</div>-->
                <!--            <div>{{index}}</div>-->

                <van-swipe-cell v-on:open="openSth($event,index)">
                    <template slot="left">
                        <van-button square type="primary" text="详情"/>
                    </template>
                    <van-cell size="large"
                              :border="true"
                              :title="Affair.data.Title"
                              :value="Affair.data.Number"/>
                    <template slot="right">
                        <van-button square type="danger" text="删除"/>
                        <van-button square type="primary" text="收藏"/>
                    </template>
                </van-swipe-cell>

                <van-cell :border="true"
                          style="background-color: RGBA(62,237,231,0.1)"
                          icon="tosend"
                          v-if="compareMonth(index)"
                          :title="printDifferentMonth(index+1)"
                ></van-cell>
            </div>
        </van-cell-group>
        <detail-and-modify
                v-model="controlShowDetails"
                v-on:close="controlShowDetails=false"
                v-bind:affair="tempAffair"
        />
        <!--        {{spendId}}  {{spendText}}  {{spend}}-->
    </div>
</template>

<script>
    // import {getAllAffairs} from "../indexedDB/indexedDB";
    import store from "../store/index"
    import detailAndModify from "./detailAndModify";

    export default {
        name: "spendsItemList",
        components: {
            detailAndModify
        },
        data() {
            return {
                controlShowDetails: false,
                tempAffair: {},
            }
        },
        beforeMount() {
            store.dispatch('refresh')
        },
        methods: {
            openSth: function (position, index) {
                // console.log(position)
                // console.log(index)
                if (position.position === "left") {
                    // console.log("left")
                    this.controlShowDetails = true
                    this.tempAffair = this.Affairs[index]
                    // console.log(this.Affairs[index])
                }
            },
            compareMonth: function (index) {
                // console.log(this.Affairs[index].data.Date)
                // console.log(this.Affairs.length)
                // console.log(index)
                if (this.Affairs.length <= index + 1) {
                    return false
                } else {
                    if ((this.Affairs[index].data.Date.getMonth()) !== (this.Affairs[index + 1].data.Date.getMonth())) {
                        return true
                    }
                    return false
                }
            },
            printDifferentMonth: function (index) {
                // console.log(index)
                if (this.Affairs[index]===undefined){
                    return undefined
                }
                return this.Affairs[index].data.Date.getFullYear() + "." + (this.Affairs[index].data.Date.getMonth() + 1)
            }
            // getAffairs: async function () {
            //     await getAllAffairs().then((value) => {
            //         this.Affairs = value
            //     }
            //     console.log(this.Affairs)
            // }
        },
        // async beforeCreate() {
        //     await getAllAffairs().then((value) => {
        //         this.Affairs = value

        // })
        // console.log(this.Affairs)
        // },
        computed: {
            Affairs() {
                // return store.state.AffairsData
                // console.log(store.getters.test1)
                // console.log(store.getters.abc)
                return store.getters.AffairSorted
            }
        }
    }
</script>

<style scoped>

</style>
