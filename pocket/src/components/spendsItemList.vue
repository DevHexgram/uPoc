<template>
    <div>
        <!--        {{AffairArray[0]}}-->
        <van-cell-group :border="true">
            <!--            <van-sticky offset-top="44">-->
            <!--                <van-cell-->
            <!--                        :border="true"-->
            <!--                        style="background-color: RGBA(112,243,255,0.95)"-->
            <!--                        icon="tosend"-->
            <!--                        size="large"-->
            <!--                        :title="printDifferentMonth(0)"-->
            <!--                ></van-cell>-->
            <!--            </van-sticky>-->

            <div v-for="(AffairGroup,indexAll) in AffairArray" v-bind:key="indexAll">
                <!--            <div>{{Affair}}</div>-->
                <!--            <div>{{index}}</div>-->
<!--                <van-sticky :offset-top="44">-->
                <div class="sticky">
                    <van-cell :border="false"
                              style="background-color: RGBA(112,243,255,0.95)"
                              icon="tosend"
                              size="large"
                              :title="printDifferentMonth(indexAll)"
                              :value="showAnalysis(indexAll)"
                    >
                    </van-cell>
                </div>
<!--                </van-sticky>-->

                <div v-for="(Affair,index) in AffairGroup" v-bind:key="Affair.creat_at">
                    <van-swipe-cell v-on:open="openSth($event,index,indexAll)">
                        <template v-slot:left>
                            <van-button square type="primary" text="详情"/>
                        </template>
                        <van-cell size="large"
                                  :border="false"
                                  :title="Affair.data.Title"
                                  :value="Affair.data.Number"

                        />
                        <template v-slot:right>
                            <van-button square type="danger" text="删除"/>
                            <!--                                                    <van-button square type="primary" text="收藏"/>-->
                        </template>
                    </van-swipe-cell>
                </div>
            </div>
        </van-cell-group>
        <div style="height: 200px">

        </div>

        <detail-and-modify
                v-model="controlShowDetails"
                v-on:close="controlShowDetails=false"
                v-bind:affair="tempAffair"
        />

        <income-detail-and-modify
                v-model="controlShowIncomeDetails"
                v-on:close="controlShowIncomeDetails=false"
                v-bind:affair="tempAffair"
        />
        <!--        {{spendId}}  {{spendText}}  {{spend}}-->
    </div>
</template>

<script>
    // import {getAllAffairs} from "../indexedDB/indexedDB";
    import store from "../store/index"
    import detailAndModify from "./detailAndModify";
    import incomeDetailAndModify from "./incomeDetailAndModify";
    import {Dialog} from 'vant';

    export default {
        name: "spendsItemList",
        components: {
            detailAndModify,
            incomeDetailAndModify
        },
        data() {
            return {
                controlShowDetails: false,
                controlShowIncomeDetails: false,
                tempAffair: {},
            }
        },
        beforeMount() {
            store.dispatch('refresh')
        },
        methods: {
            openSth: function (position, index, indexAll) {
                // console.log(position)
                // console.log(index)
                if (position.position === "left") {
                    // console.log("left")
                    if (this.AffairArray[indexAll][index].type === "-") {
                        this.controlShowDetails = true
                    } else {
                        this.controlShowIncomeDetails = true
                    }
                    this.tempAffair = this.AffairArray[indexAll][index]
                    this.tempAffair.data.Number = this.tempAffair.data.Number.toString()
                    // console.log(this.Affairs[index])
                } else if (position.position === "right") {
                    Dialog.confirm({
                        title: 'warning',
                        message: '确定要删除吗'
                    }).then(() => {
                        // on confirm
                        store.dispatch("deleteAffair",{Affair:this.AffairArray[indexAll][index]})
                    }).catch(() => {
                        // on cancel
                    });
                }

            },
            // compareMonth: function (index) {
            // console.log(this.Affairs[index].data.Date)
            // console.log(this.Affairs.length)
            // console.log(index)
            // if (this.AffairArray.length <= index + 1) {
            //     return false
            // } else {
            //     if ((this.AffairArray[index].data.Date.getMonth()) !== (this.AffairArray[index + 1].data.Date.getMonth())) {
            //         return true
            //     }
            //     return false
            // }
            // },
            printDifferentMonth: function (indexAll) {
                // console.log(index)
                if (this.AffairArray[indexAll][0] === undefined) {
                    return undefined
                }
                return this.AffairArray[indexAll][0].data.Date.getFullYear() + "." + (this.AffairArray[indexAll][0].data.Date.getMonth() + 1)
            },
            showAnalysis: function (indexAll) {
                let totalIncome = 0;
                let totalSpend = 0;
                let affair;
                if (this.AffairArray[indexAll][0] === undefined) {
                    return
                }
                for (affair in this.AffairArray[indexAll]) {
                    // console.log(affair)
                    if (this.AffairArray[indexAll][affair].type === "+") {
                        // console.log(1)
                        totalIncome = totalIncome + parseFloat(this.AffairArray[indexAll][affair].data.Number);
                    } else {
                        totalSpend = totalSpend + parseFloat(this.AffairArray[indexAll][affair].data.Number);
                    }
                }
                // console.log("收入:"+totalIncome+"支出:"+totalSpend)
                return "收入:" + totalIncome + "支出:" + totalSpend
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
            AffairArray() {
                // return store.state.AffairsData
                // console.log(store.getters.test1)
                // console.log(store.getters.abc)
                return store.getters.AffairSorted
            }
        }
    }
</script>

<style scoped>
    .sticky {
        position: -webkit-sticky;
        position: sticky;
        top: 44px;
        z-index: 1;
    }
</style>
