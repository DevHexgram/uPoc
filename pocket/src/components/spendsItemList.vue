<template>
    <van-cell-group>

        <div v-for="(Affair,index) in Affairs" v-bind:key="index">
<!--            <div>{{Affair}}</div>-->
<!--            <div>{{index}}</div>-->
            <van-swipe-cell>
                <template slot="left">
                    <van-button square type="primary" text="选择"/>
                </template>
                <van-cell :border="true" :title="Affair.data.title" :value="Affair.data.number"/>
                <template slot="right">
                    <van-button square type="danger" text="删除"/>
                    <van-button square type="primary" text="收藏"/>
                </template>
            </van-swipe-cell>
        </div>

    </van-cell-group>
    <!--        {{spendId}}  {{spendText}}  {{spend}}-->
</template>

<script>
    import {getAllAffairs} from "../indexedDB/indexedDB";

    export default {
        name: "spendsItemList",
        data() {
            return {
                Affairs: ""
            }
        },
        async beforeCreate() {
            await getAllAffairs().then((value) => {
                this.Affairs = value
            })
            console.log(this.Affairs)
        }
    }
</script>

<style scoped>

</style>
