<template>
    <view class="container">
        <app/>
    </view>
</template>

<script>
import Vue from "vue-native-core";
import Vuelidate from 'vuelidate';
import App from "./App.vue";
import { VueNativeBase } from "native-base";
import store from "./store";

Vue.use(Vuelidate);
Vue.use(VueNativeBase);
Vue.prototype.$store = store;

console.disableYellowBox = true;

export default {
    components: { App },
};
</script>

<style>
.container {
    flex: 1;
}
</style>
