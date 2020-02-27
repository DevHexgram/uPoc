<template>
    <div class="hello">
        <data-display/>
        <div class="about">
            <h1>This is an about page</h1>
        </div>
        <!--    <div id="chart1"></div>-->
<!--        <div id="test1" style="width: 100%;height:300px;"></div>-->
    </div>
</template>

<script>
    import store from '../store/index'
    import dataDisplay from "../components/dataDisplay";

    export default {
        name: 'HelloWorld',
        data() {
            return {
                temp: {}
            }
        },
        // mounted() {
            // this.$chart.line1('chart1');
            // console.log(this.temp);
            // this.$chart.init('test1');
            // this.$chart.update('test1');
        // },
        methods: {
            test: function () {
                this.temp = store.getters.AffairArray
            }
        },
        components: {
            dataDisplay,
        }
    }
</script>

<style scoped>
    #chart1 {
        width: 300px;
        height: 300px;
    }
</style>
