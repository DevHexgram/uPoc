<template>
    <div>
        <div>config</div>


        <van-grid>
            <van-grid-item icon="photo-o" text="文字"/>
            <van-grid-item icon="photo-o" text="文字"/>
            <van-grid-item icon="photo-o" text="文字"/>
            <van-grid-item icon="photo-o" text="文字"/>
        </van-grid>
    </div>
</template>

<script>
  export default {
    name: "Config",
    methods:{
      dealWithPoint:function (event) {
        console.log(event);
      }
    }
  }
</script>

<style scoped>

</style>
