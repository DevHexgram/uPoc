<template>
    <div>
        <van-popup
                v-model="isShow"
                position="top"
                v-on:close="control"
                v-on:click-overlay="control"
                v-bind:close-on-click-overlay="false"
        >
            <van-form @submit="add" ref="Form">

                <van-field v-model="cost.Title"
                           label="简述"
                           :rules="[{ required: true, message: '请填写简述' }]"
                />
                <van-field v-bind:value="NumberForShow"
                           placeholder="-$0.00"
                           readonly
                           clickable
                           @touchstart.native.stop="showNumberKey = true"
                           type="digit"
                           label="金额"
                           :rules="[{ required: true, message: '请填写金额' }]"
                />
                <van-field v-model="cost.Type"
                           label="类型"
                           readonly
                           v-on:click="showPicker=true"
                           :rules="[{ required: true, message: '请选择类型' }]"/>
                <van-field label="日期"
                           :placeholder="NowTime"
                           readonly
                           :rules="[{ required: true, message: '请选择日期' }]"
                           v-bind:value="cost.Date"
                           v-on:click="showCalendar=true"
                />
                <van-field v-model="cost.Extra" label="备注"/>
                <van-cell style="background-color: lightblue" clickable v-on:click="submitForm">
                    <van-icon
                            slot="right-icon"
                            name="shopping-cart-o"
                            style="line-height: inherit;"
                            size="25"
                    />
                </van-cell>
            </van-form>

            <van-calendar v-model="showCalendar"
                          @confirm="onConfirm"
                          :show-confirm="false"
                          get-container="body"
                          title="Hex"
                          :round="false"
                          :style="{ height: '450px' }"
            />

            <van-number-keyboard
                    style="height: 216px"
                    v-model="cost.Number"
                    :show="showNumberKey"
                    :maxlength="6"
                    @blur="showNumberKey = false"
                    extra-key="."
            />

            <van-popup v-model="showPicker"
                       position="left"
                       class="transparent"
            >
                <van-grid :gutter="10"
                          clickable
                          :column-num="3"
                          :icon-size="50"
                >
                    <van-grid-item
                            v-for="type in costType"
                            :key="type.text"
                            :icon="type.icon"
                            :text="type.text"
                            v-on:click="chooseType(type.text)"
                    />
                </van-grid>
            </van-popup>
        </van-popup>

    </div>
</template>

<script>
    import {addSpend} from "../indexedDB/indexedDB";
    // import {Toast} from 'vant';

    export default {
        name: "addSpend",
        data() {
            return {
                costType: [
                    {
                        text: "日常费用",
                        icon: "bag-o"
                    },
                    {
                        text: "固定支出",
                        icon: "balance-list-o"
                    },
                    {
                        text: "大项消费",
                        icon: "gem-o"
                    },
                    {
                        text: "往来开销",
                        icon: "friends-o"
                    },
                    {
                        text: "娱乐开支",
                        icon: "cashier-o"
                    },
                    {
                        text: "其它消费",
                        icon: "gold-coin-o"
                    },
                ],
                showCalendar: false,
                showPicker: false,
                showNumberKey: false,
                NowTime:new Date().toLocaleDateString('zh-CN'),
                cost: {
                    Title: "",
                    Number: "",
                    Date: "",
                    Type: "",
                    Extra: "无"
                },
            }
        },
        computed: {
            /**
             * @return {string}
             */
            NumberForShow: function () {
                return "-$" + this.cost.Number
            }
        },
        model: {
            prop: "isShow",
            event: "close",
        },
        props: {
            isShow: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            submitForm() {
                this.$refs.Form.submit()
            },
            control() {
                this.$emit('close', this.isShow)
            },
            add() {
                this.control()
                addSpend(this.cost,"-")
                for (let key in this.cost) {
                    this.cost[key] = ""
                }
            },
            chooseType(type) {
                this.cost.Type = type
                this.showPicker = false
            },
            formatDate(date) {
                return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            },
            onConfirm(date) {
                this.showCalendar = false;
                this.cost.Date = this.formatDate(date);
            }
        },
    }
</script>

<style scoped>
    .transparent {
        background-color: transparent;
    }
</style>
