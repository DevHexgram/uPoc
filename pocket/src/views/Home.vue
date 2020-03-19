<template>
    <div>
        <!--    <img alt="Vue logo" src="../assets/logo.png">-->
        <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <!--   <HCounter/>-->
        <van-sticky>
            <add-control/>
        </van-sticky>
        <spends-item-list/>
    </div>
</template>

<script>
    // @ is an alias to /src
    // import HelloWorld from '@/components/HelloWorld.vue'
    // import HCounter from "../components/Hcounter";
    import addControl from "@/components/addControl";
    import spendsItemList from "@/components/spendsItemList";

    export default {
        name: 'Home',
        components: {
            // HelloWorld
            // HCounter
            addControl,
            spendsItemList
        }
    }
</script>
