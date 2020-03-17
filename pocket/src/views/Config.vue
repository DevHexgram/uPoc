<template>
    <div>
    <div>config</div>
        <van-swipe-cell>
            <template v-slot:left>
                <van-button square type="primary" text="选择" />
            </template>
            <van-cell :border="false" title="单元格" value="内容" />
            <template v-slot:right>
                <van-button square type="danger" text="删除" />
                <van-button square type="primary" text="收藏"/>
            </template>
        </van-swipe-cell>
        <van-swipe-cell>
            <van-card
                    num="2"
                    price="2.00"
                    desc="描述信息"
                    title="商品标题"
                    class="goods-card"
                    thumb="https://img.yzcdn.cn/vant/cat.jpeg"
            />
            <template v-slot:right>
                <van-button
                        square
                        text="删除"
                        type="danger"
                        class="delete-button"
                />
            </template>

        </van-swipe-cell>
    <van-grid>
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
    </van-grid>
    </div>
</template>

<script>
    export default {
        name: "Config"
    }
</script>

<style scoped>

</style>
