<template>

    <div>
        <!--        get-container="body"-->
<!--        <van-tabs animated swipeable sticky>-->
<!--            <van-tab title="账目">-->
<!--                    <van-sticky>-->
<!--                        <add-control/>-->
<!--                    </van-sticky>-->
<!--                <div :style="{minHeight: trueHeight-44+'px'}">-->
<!--                                    <div get-container="body" >-->
<!--                    <spends-item-list/>-->
<!--                </div>-->
<!--            </van-tab>-->
<!---->
<!--            <van-tab title="日历">-->
<!--                <spend-calender/>-->
<!--            </van-tab>-->
<!---->
<!--            <van-tab title="分析">-->
<!---->
<!--            </van-tab>-->
<!--        </van-tabs>-->

        <router-view />

        <van-tabbar route>
            <van-tabbar-item replace to="/" icon="home-o">
                标签
            </van-tabbar-item>
            <van-tabbar-item replace to="/about" icon="search">
                标签
            </van-tabbar-item>
        </van-tabbar>
        <!--                <router-view/>-->
    </div>

</template>

<script>
    // import spendCalender from "@/components/spendCalender";
    // import addControl from "@/components/addControl";
    // import spendsItemList from "./components/spendsItemList";

    // import router from "./router";
    export default {
        name: 'Home',
        components: {
            // spendCalender,
            // addControl,
            // spendsItemList,
            // router
        },
        data() {
            return {
                // trueHeight: document.body.clientHeight,
                // test: this.$refs.toptop
            }
        },

    }
</script>

<style>
    html, body {
        height: 100%;
    }
</style>
