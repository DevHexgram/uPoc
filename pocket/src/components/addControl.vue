<template>
    <div>
        <van-swipe-cell v-on:open="openAdd" :stop-propagation="true"
        >
            <template slot="left">
                <van-button square type="warning" text="COST"/>
            </template>
            <van-cell :border="false" title="" value="" style="background-color: RGBA(62,237,231,1)" size ="large" clickable>
                <template #right-icon>
                    <van-icon
                            name="balance-o"
                            style="line-height: inherit"
                            size="2em"
                    />
                </template>

                <van-icon
                        slot="icon"
                        name="after-sale"
                        style="line-height: inherit;"
                        size="2em"
                />
            </van-cell>
            <template slot="right">
                <van-button square type="primary" text="GET"/>
            </template>
        </van-swipe-cell>

        <add-spend v-bind:is-show="controlShowCOSTAdd"
                   v-on:close="controlShowCOSTAdd=false"
        />

        <add-income v-bind:is-show="controlShowIncomeAdd"
                    v-on:close="controlShowIncomeAdd=false"
        />
    </div>

</template>

<script>
    import addIncome from "./addIncome";
    import addSpend from "./addSpend";

    export default {
        name: "addControl",
        components: {
            addIncome,
            addSpend
        },
        data() {
            return {
                controlShowCOSTAdd: false,
                // controlRefresh: false,
                controlShowIncomeAdd: false,
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
    }
</script>

<style scoped>

</style>
