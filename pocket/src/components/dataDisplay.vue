<template>
        <div v-if="AffairArray[0][0]!==undefined">
<!--    <div>-->
        <div v-for="(AffairGroup,topIndex) in AffairArray" v-bind:key="topIndex">

            <van-cell-group>
                <van-swipe-cell v-on:open="openSth($event,AffairGroup)">
                    <!--                    <van-swipe-cell>-->
                    <!--                    <template slot="left">-->
                    <!--                    <van-button square type="danger" text="删除"/>-->
                    <!--                    </template>-->
                    <van-cell size="large"
                              :border="true"
                              :title="getYearAndMonth(AffairGroup[0].data.Date)"
                              is-link
                              arrow-direction="left"
                    />
                    <template slot="right">
                        <van-button square type="primary" text="详情"/>
                        <!--                                                    <van-button square type="primary" text="收藏"/>-->
                    </template>
                </van-swipe-cell>
            </van-cell-group>
        </div>

        <data-visualization
                v-model="showVisualization"
                v-on:close="showVisualization=false"
                v-bind:MonthDate="tempMonthDate"
        />

    </div>
</template>

<script>
    import store from "../store/index"
    import dataVisualization from "./dataVisualization";
    // import {Dialog} from "vant";

    export default {
        name: "dataDisplay",
        components: {
            dataVisualization,
        },
        data() {
            return {
                showVisualization: false,
                tempMonthDate: [],
            }
        },
        methods: {
            getYearAndMonth: function (date) {
                if (date === undefined) {
                    return ""
                }
                return date.getFullYear() + "-" + (date.getMonth() + 1)
            },
            openSth: function (position, AffairGroup) {
                if (position.position === "right") {
                    this.showVisualization = true;
                    this.tempMonthDate = AffairGroup
                }
            }
        },
        computed: {
            AffairArray() {
                // console.log(1)
                // console.log(store.getters.AffairSorted)
                // let temp = store.getters.AffairSorted
                // if (temp[0][0] === undefined){
                //     return
                // }
                return store.getters.AffairSorted;
            }
        },
        beforeMount() {
            store.dispatch('refresh')
            // this.AffairArray = store.getters.AffairSorted
        },
    }
</script>

<style scoped>

</style>
