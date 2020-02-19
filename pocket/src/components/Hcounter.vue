<template>
    <!--    <div :style="{height: '1000'+'px'}">-->
    <!--        <h1>hello</h1>-->
    <!--        <baseInput-->
    <!--                v-model="newSpend"-->
    <!--                v-on:keydown.enter="addSpends"-->
    <!--                placeholder="add new spend"-->
    <!--        />-->
    <div>
        <spends-item-list/>

<!--        <van-sticky :container="container">-->
            <van-swipe-cell v-on:open="openAdd" :stop-propagation="true">
                <template slot="left">
                    <van-button square type="warning" text="COST"/>
                </template>
                <van-cell :border="false" title="" value="" style="background-color: RGBA(62,237,231,0.6)" clickable>
                    <van-icon
                            slot="right-icon"
                            name="balance-o"
                            style="line-height: inherit;"
                            size="25"
                    />
                    <van-icon
                            slot="icon"
                            name="after-sale"
                            style="line-height: inherit;"
                            size="25"
                    />
                </van-cell>
                <template slot="right">
                    <van-button square type="primary" text="GET"/>
                </template>
            </van-swipe-cell>
<!--        </van-sticky>-->

        <add-spend v-bind:is-show="controlShowCOSTAdd"
                   v-on:close="controlShowCOSTAdd=false"
        />

        <add-income v-bind:is-show="controlShowIncomeAdd"
                    v-on:close="controlShowIncomeAdd=false"
        />

    </div>
</template>

<script>
    import spendsItemList from "./spendsItemList";
    import addIncome from "./addIncome";
    // import baseInput from "./baseInput";
    import addSpend from "./addSpend";

    export default {
        name: "HCounter",
        components: {
            spendsItemList,
            // baseInput,
            addSpend,
            addIncome,
            // indexedDBa,
        },
        data() {
            return {
                controlShowCOSTAdd: false,
                controlRefresh: false,
                controlShowIncomeAdd: false,
                // container:null,
            }
        },
        methods: {
            openAdd: function (position) {
                // console.log(position.position);
                if (position.position === "left") {
                    this.controlShowCOSTAdd = true
                } else if (position.position === "right") {
                    this.controlShowIncomeAdd = true
                }
            },
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
</style>
