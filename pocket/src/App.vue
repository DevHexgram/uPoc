<template>

    <div >
        <!--        get-container="body"-->
        <van-tabs animated swipeable sticky>
            <van-tab title="账目" >
                <div :style="{height: trueHeight-44+'px'}">
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
                trueHeight:document.body.clientHeight
            }
        },
    }
</script>

<style>
    html,body{
        height: 100%;
    }
</style>
