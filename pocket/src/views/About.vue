<template>
  <div class="hello">
    <div class="about">
      <h1>This is an about page</h1>
    </div>
<!--    <div id="chart1"></div>-->
    <div id="test1" style="width: 100%;height:300px;"></div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
      }
    },
    mounted() {
      // this.$chart.line1('chart1');
      this.$chart.testTest('test1');
    }
  }
</script>

<style scoped>
  #chart1 {
    width: 300px;
    height: 300px;
  }
</style>
