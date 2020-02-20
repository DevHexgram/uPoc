<template>
    <!--    <div :style="{height: '1000'+'px'}">-->
    <!--        <h1>hello</h1>-->
    <!--        <baseInput-->
    <!--                v-model="newSpend"-->
    <!--                v-on:keydown.enter="addSpends"-->
    <!--                placeholder="add new spend"-->
    <!--        />-->
    <div>
        <div style="">
        </div>


<!--        <van-sticky :container="container">-->
<!--        <div style="position: sticky;position: -webkit-sticky;top: 1000px;">-->
<!--        <div class="footer">-->
<!--        </van-sticky>-->
<!--        </div>-->


    </div>
</template>

<script>

    export default {
        name: "HCounter",
        components: {
            // baseInput,
            // indexedDBa,
        },
        // mounted() {
        //     console.log(document.body)
        //     this.container = document.body;
        // }
    }
</script>

<style scoped>
    html, body {
        height: 100%;
    }
    .sticky {
        position: sticky;
        position: -webkit-sticky;
        bottom: 0px;
    }
    .footer {
        position: fixed;
        height: 34px;
        left: 0;
        right: 0;
        bottom: 0;
    }
</style>
