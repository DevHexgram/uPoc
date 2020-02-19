<template>

    <div ref="toptop">
        <!--        get-container="body"-->
        <van-tabs animated swipeable sticky>
            <van-tab title="账目">
                                <div :style="{minHeight: trueHeight-44+'px'}">
<!--                <div get-container="body" >-->
                    <HCounter/>
                </div>
            </van-tab>

            <van-tab title="日历">
                <spend-calender/>
            </van-tab>

            <van-tab title="分析">

            </van-tab>
        </van-tabs>


        <!--                <router-view/>-->
    </div>
</template>

<script>
    import HCounter from "@/components/Hcounter";
    import spendCalender from "@/components/spendCalender";

    export default {
        name: 'Home',
        components: {
            HCounter,
            spendCalender
        },
        data() {
            return {
                trueHeight: document.body.clientHeight,
                test:this.$refs.toptop
            }
        },

    }
</script>

<style>
    html, body {
        height: 100%;
    }
</style>
