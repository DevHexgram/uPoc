<template>
    <div v-if="!(Object.keys(this.affair).length===0)">

        <van-popup
                get-container="body"
                v-model="isShow"
                position="top"
                v-on:click-overlay="control"
                v-bind:close-on-click-overlay="false"
        >
            <van-form @submit="modify" ref="Form">
                <!--                嘤嘤嘤-->
                <van-field v-model="affair.data.Title"
                           clickable
                           :disabled="isNotModifying"
                           label="简述"
                           :rules="[{ required: true, message: '请填写简述' }]"
                />
                <van-field v-bind:value="numberForShow"
                           placeholder="$0.00"
                           readonly
                           :disabled="isNotModifying"
                           clickable
                           @touchstart.native.stop="isNotModifying === false?showNumberKey = true:showNumberKey=false"
                           label="金额"
                           :rules="[{ required: true, message: '请填写金额' }]"
                />
                <van-field v-model="affair.data.Type"
                           label="类型"
                           readonly
                           :disabled="isNotModifying"
                           clickable
                           v-on:click="isNotModifying === false?showPicker=true:showPicker = false"
                           :rules="[{ required: true, message: '请选择类型' }]"/>
                <van-field label="日期"
                           placeholder=""
                           readonly
                           :disabled="isNotModifying"
                           clickable
                           :rules="[{ required: true, message: '请选择日期' }]"
                           v-bind:value="dateForShow"
                           v-on:click="isNotModifying === false?showCalendar = true:showCalendar = false"
                />
                <van-field v-model="affair.data.Extra"
                           clickable
                           :disabled="isNotModifying"
                           label="备注"
                />
                <van-cell style="background-color:#ff976a" clickable v-on:click="submitForm">
                    <van-icon
                            slot="right-icon"
                            name="edit"
                            style="line-height: inherit;"
                            size="25"
                    />
                </van-cell>
            </van-form>

            <van-number-keyboard
                    style="height: 216px"
                    v-model="affair.data.Number"
                    :show="showNumberKey"
                    :maxlength="7"
                    @blur="showNumberKey = false"
                    extra-key="."
            />

            <van-calendar v-model="showCalendar"
                          @confirm="onConfirm"
                          :show-confirm="false"
                          get-container="body"
                          title="Hex"
                          :round="false"
                          :min-date="minDate"
                          :max-date="maxDate"
                          :default-date="defaultDate"
                          :style="{ height: '450px' }"
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
    import moment from "moment";
    import store from "../store/index"

    export default {
        name: "incomeDetailAndModify",
        props: {
            isShow: {
                type: Boolean,
                default: false,
            },
            affair: {
                type: Object,
            },
        },
        data() {
            return {
                costType: [
                    {
                        text: "工作收入",
                        icon: "paid"
                    },
                    {
                        text: "固定收入",
                        icon: "home-o" //意义不明
                    },
                    {
                        text: "理财收入",
                        icon: "chart-trending-o"
                    },
                    {
                        text: "外快收入",
                        icon: "point-gift-o"
                    },
                    {
                        text: "其它收入",
                        icon: "apps-o" //意义不明
                    },
                ],
                showNumberKey: false,
                isNotModifying: true,
                showCalendar: false,
                defaultDate: new Date(),
                showPicker: false,
                minDate: moment().subtract(6, 'months').toDate(),
                maxDate: moment().add(2, 'months').toDate(),
            }
        },
        model: {
            prop: "isShow",
            event: "close",
        },
        methods: {
            control() {
                this.isNotModifying = true
                store.dispatch("refresh")
                this.$emit('close', this.isShow)
            },
            submitForm() {
                this.$refs.Form.submit()
            },
            async modify() {
                if (this.isNotModifying === true) {
                    this.isNotModifying = false
                } else {
                    await store.dispatch("modifyIncome", {income: this.affair}).then(() => {

                    })
                    this.control()
                }
            },
            formatDate(date) {
                return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            },
            onConfirm(date) {
                this.showCalendar = false;
                this.affair.data.Date = date;
            },
            chooseType(type) {
                this.affair.data.Type = type;
                this.showPicker = false;
            },
        },
        computed: {
            dateForShow() {
                return this.formatDate(this.affair.data.Date)
            },
            numberForShow() {
                return "$" + this.affair.data.Number.replace("-", "")
            },
        },
    }
</script>

<style scoped>
    .transparent {
        background-color: transparent;
    }
</style>
