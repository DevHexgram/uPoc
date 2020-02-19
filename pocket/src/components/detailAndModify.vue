<template>
    <div v-if="!(Object.keys(this.affair).length===0)">
        <van-popup
                v-model="isShow"
                position="top"
                v-on:click-overlay="control"
                v-bind:close-on-click-overlay="false"
        >
            <van-form @submit="modify" ref="Form">

                <van-field v-model="affair.data.Title"
                           clickable
                           :disabled="isNotModifying"
                           label="简述"
                           :rules="[{ required: true, message: '请填写简述' }]"
                />
                <van-field v-bind:value="numberForShow"
                           placeholder="-$0.00"
                           readonly
                           :disabled="isNotModifying"
                           clickable
                           @touchstart.native.stop="isNotModifying===false?showNumberKey = true:showNumberKey=false"
                           label="金额"
                           :rules="[{ required: true, message: '请填写金额' }]"
                />
                <van-field v-model="affair.data.Type"
                           label="类型"
                           readonly
                           :disabled="isNotModifying"
                           clickable
                           v-on:click="showPicker=true"
                           :rules="[{ required: true, message: '请选择类型' }]"/>
                <van-field label="日期"
                           placeholder=""
                           readonly
                           :disabled="isNotModifying"
                           clickable
                           :rules="[{ required: true, message: '请选择日期' }]"
                           v-bind:value="dateForShow"
                           v-on:click="showCalendar=true"
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
        </van-popup>
    </div>
</template>

<script>
    export default {
        name: "detailAndModify",
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
                showNumberKey: false,
                isNotModifying: true,
                showCalendar: false,
            }
        },
        model: {
            prop: "isShow",
            event: "close",
        },
        methods: {
            control() {
                this.isNotModifying = true
                this.$emit('close', this.isShow)
            },
            submitForm() {
                this.$refs.Form.submit()
            },
            modify() {
                this.isNotModifying = false
            },
            formatDate(date) {
                return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            },
        },
        computed: {
            dateForShow() {
                return this.formatDate(this.affair.data.Date)
            },
            numberForShow() {
                return "$-" + this.affair.data.Number.replace("-", "")
            },
        },
    }
</script>

<style scoped>

</style>
