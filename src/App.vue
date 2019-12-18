<template>
    <root>
        <app-navigator></app-navigator>
    </root>
</template>

<script>
import {
    createAppContainer,
    createStackNavigator,
} from "vue-native-router";

import { Root } from "native-base";

import StudentList from "./screens/StudentList";
import StudentForm from "./screens/StudentForm";

const StackNavigator = createStackNavigator(
    {
        Home: StudentList,
        Form: StudentForm,
    },
    {
        initialRouteName: "Home",
        transitionConfig: () => ({
            containerStyle: {
                marginTop: -60,
            }
        }),
    }
);

const AppNavigator = createAppContainer(StackNavigator);

export default {
    components: { Root, AppNavigator},
}
</script>
