<template>
    <nb-container :style="{flex:1, backgroundColor: '#fff'}">
        <nb-header>
            <nb-left/>
            <nb-body>
                <nb-title>Estudantes</nb-title>
            </nb-body>
            <nb-right>
                <nb-button transparent :on-press="goToStudentFormScreen">
                    <nb-icon name="add"/>
                </nb-button>
            </nb-right>
        </nb-header>

        <nb-content padder>
            <nb-spinner v-if="loading"></nb-spinner>
            <nb-view v-else>
                <item
                    v-for="item in students"
                    :key="item.id"
                    :data="item"
                    @remove="onRemoveStudent(item.id)"
                    @edit="onEditStudent(item)"
                />
            </nb-view>
        </nb-content>
    </nb-container>
</template>

<script>
import Item from '../components/Item';
import { mapGetters, mapActions } from 'vuex';
import { Toast } from "native-base";
import { Alert } from 'react-native';
import { AsyncStorage } from "react-native";

export default {
    props: {
        navigation: Object
    },
    components: {
        Item
    },
    mounted() {
        this.loadAllStudents();
    },
    data() {
        return {
            isFabIconActive: false,
            stylesObj: {
                fabContainer: {
                    position: "bottomRight"
                }
            }
        };
    },
    methods: {
        ...mapActions(['loadAllStudents', 'removeStudent', 'setCurrentStudent', 'resetCurrentStudent']),
        onRemoveStudent(id) {
            Alert.alert(
                'Confirmação',
                'Confirma a remoção do estudante?',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            this.removeStudent(id);

                            Toast.show({
                                text: "Estudante removido com sucesso!",
                                buttonText: "Ok",
                                type: "success"
                            });
                        }
                    },
                    {
                        text: 'Cancelar',
                        style: 'cancel'
                    },
                ],
                { cancelable: false }
            );
        },
        onEditStudent(student) {
            this.setCurrentStudent(student);
            this.navigation.navigate('Form');
        },
        goToStudentFormScreen() {
            this.resetCurrentStudent();
            this.navigation.navigate("Form");
        }
    },
    computed: {
        ...mapGetters(['students', 'loading']),
    },
};
</script>
