<template>
    <div>
        <van-popup
                :lazy-render = "false"
                v-model="isShow"
                position="top"
                v-on:click-overlay="control"
                v-bind:close-on-click-overlay="false"
                get-container="body"
                :style="{height: clientHeight*0.75+'px'}"
        >
<!--            {{MonthDate}}-->
<!--            {{clientWidth}}-->
            <div id="pies" :style="{width: clientWidth+'px',height:clientHeight*0.25+'px'}"></div>
            <div id="bars" :style="{width: clientWidth+'px',height:clientHeight*0.25+'px'}"></div>
        </van-popup>
    </div>
</template>

<script>
// import {dealMonthData} from "../myCharts/dataHandle";

export default {
        name: "dataVisualization",
        data(){
            return{
                clientWidth :document.body.clientWidth,
                clientHeight:document.body.clientHeight,
            }
        },
        model: {
            prop: "isShow",
            event: "close",
        },
        props: {
            isShow: {
                type: Boolean,
                default: false
            },
            MonthDate: {
                type: Array,
            }
        },
        methods: {
            control() {
                this.$emit('close', this.isShow)
            },
        },
        // beforeMount() {
        //     this.$chart.line1("test11")
        //     this.$chart.update("test1")
        // }
        watch:{
          isShow:function () {
              if (this.isShow === true){
                  // try {
                  // let temp =[];
                  // temp=dealMonthData(this.MonthDate);
                  // console.log(temp);
                      this.$chart.line1("pies","bars",this.MonthDate);
                  // }
                  // finally {
                  //     console.log("wrong")
                  // }
              }
          }
        },
    }
</script>

<style scoped>

</style>
