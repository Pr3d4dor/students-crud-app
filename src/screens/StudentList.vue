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
            <item
                v-for="item in students"
                :key="item.id"
                :data="item"
                @remove="onRemoveStudent(item.id)"
                @edit="onEditStudent(item)"
            />
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
        AsyncStorage.getItem('@StudendsCrud:students').then((data) => {
            const students = JSON.parse(data);
            this.$store.state.loading = true;

            if (students && students.length > 0) {
                this.$store.commit('SET_STUDENTS', students);
            } else {
                this.$store.commit('SET_STUDENTS', []);
            }

            this.$store.state.loading = false;
        })
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
        ...mapActions(['getStudent', 'removeStudent', 'setCurrentStudent', 'resetCurrentStudent']),
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
        ...mapGetters(['students']),
    },
};
</script>
