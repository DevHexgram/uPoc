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
        <div>
            <van-swipe-cell v-on:open="openAdd">
                <template slot="left">
                    <van-button square type="warning" text="COST"/>
                </template>
                <van-cell :border="false" title="" value="" style="background-color: lightblue" clickable>
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
        </div>

        <add-spend v-bind:is-show="controlShowCOSTAdd" v-on:close="controlShowCOSTAdd=false"/>
    </div>
</template>

<script>
    import spendsItemList from "./spendsItemList";
    // import baseInput from "./baseInput";
    import addSpend from "./addSpend";


    let nextId = 1
    export default {
        name: "HCounter",
        components: {
            spendsItemList,
            // baseInput,
            addSpend,
            // indexedDBa,
        },
        data() {
            return {
                controlShowCOSTAdd: false,
                newSpend: '',
                spends: [
                    {
                        id: nextId++,
                        text: "明日方舟充值",
                        spend: -648
                    },
                    {
                        id: nextId++,
                        text: "anne pro 2",
                        spend: -300
                    },
                    {
                        id: nextId++,
                        text: "ikbc poker",
                        spend: -200
                    }
                ]
            }
        },
        methods: {
            openAdd: function (position) {
                console.log(position.position);
                if (position.position == "left") {
                    this.controlShowCOSTAdd = true
                }
            },
        },
    }
</script>

<style scoped>
    html, body {
        height: 100%;
    }
</style>
