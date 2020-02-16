<template>
    <input type="text" :value="value" v-on="listeners"/>
</template>

<script>
    export default {
        name: "baseInput",
        props: {
            value: {
                type: String,
                default: "test"
            }
        },
        computed: {
            listeners() {
                return {
                    ...this.$listeners,
                    input: event => this.$emit("input", event.target.value),
                    // keydown: event => this.$emit("input", event.target.value)
                };
            }
        }
    };
</script>

<style scoped></style>
