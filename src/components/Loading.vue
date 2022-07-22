<template>
    <div v-if="loading || scroll" :class="scroll ? 'loadingScroll' : 'loading'">
        <div class="loading__icon"></div>
    </div>
</template>

<script>
export default {
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        scroll: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<style scoped lang="scss">
.loading {
    width: 100vw;
    top: 0;
    background: rgba(0, 0, 0, 0.8);
    left: 0;
    position: fixed;
    display: flex;
    z-index: 998;
    height: 100%;

    &__icon {
        border: 16px solid #f3f3f3;
        border-top: 16px solid #2C2C2D;
        margin: auto;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        animation: spin 2s linear infinite;
    }
}

.loadingScroll {
    bottom: 20px;
    left: 0;
    z-index: 998;

    &__icon {
        border: 16px solid #f3f3f3;
        border-top: 16px solid #2C2C2D;
        margin: auto;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        animation: spin 2s linear infinite;
    }
}
</style>

