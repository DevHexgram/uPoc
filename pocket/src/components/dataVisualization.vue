<template>
    <div>
        <van-popup
                :lazy-render = "false"
                v-model="isShow"
                position="top"
                v-on:click-overlay="control"
                v-bind:close-on-click-overlay="false"
                get-container="body"
        >
            {{MonthDate}}
            <div id="extra" style="width: 100%;height:300px;"></div>
        </van-popup>
    </div>
</template>

<script>

    export default {
        name: "dataVisualization",
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
                      this.$chart.line1("extra")
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
