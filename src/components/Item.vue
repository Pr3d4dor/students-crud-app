<template>
    <nb-card-item :key="data.id">
        <touchable-opacity class="container" :active-opacity="0.3" :on-press="() => $emit('edit')">
            <nb-left>
                <nb-icon name="md-person"></nb-icon>
                <nb-text>{{ data.name }}</nb-text>
            </nb-left>
            <nb-body>
            </nb-body>
            <nb-button danger :on-press="() => $emit('remove')">
                <nb-icon name="trash" />
            </nb-button>
        </touchable-opacity>
    </nb-card-item>
</template>

<script>
export default {
    props: {
        data: Object,
        navigation: Object,
    },
};
</script>

<style>
.container {
    flex: 1;
    flex-direction: row;
}
</style>
