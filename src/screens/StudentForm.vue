<template>
    <nb-container :style="{ flex:1, backgroundColor: '#fff' }">
        <nb-header>
            <nb-left>
                <nb-button transparent :on-press="goToHomeScreen">
                    <nb-icon name="ios-arrow-back"/>
                </nb-button>
            </nb-left>
            <nb-body>
                <nb-title>Formulario</nb-title>
            </nb-body>
            <nb-right/>
        </nb-header>

        <nb-content>
            <nb-form>
                <nb-item stackedLabel>
                    <nb-label>Nome</nb-label>
                    <nb-input v-model="student.name"/>
                </nb-item>

                <nb-item stackedLabel>
                    <nb-label>Data de Nascimento</nb-label>
                    <nb-date-picker
                        :defaultDate="defaultDate"
                        :minimumDate="minimumDate"
                        :maximumDate="maximumDate"
                        :modalTransparent="false"
                        animationType="fade"
                        androidMode="default"
                        :onDateChange="() => {}"
                    />
                </nb-item>

                <nb-item stackedLabel>
                    <nb-label>Serie de Ingresso</nb-label>
                    <nb-picker
                        mode="dropdown"
                        :note="false"
                        :style="{ width: 350 }"
                        :selectedValue="student.grade"
                        :onValueChange="value => { student.grade = value }"
                    >
                        <item :label="grade.label" :value="grade.value" v-for="grade in gradeOptions" :key="grade.label"></item>
                    </nb-picker>
                </nb-item>

                <nb-item stackedLabel>
                    <nb-label>CEP</nb-label>
                    <nb-input v-model="student.cep"/>
                </nb-item>

                <nb-item stackedLabel>
                    <nb-label>Rua</nb-label>
                    <nb-input v-model="student.street"/>
                </nb-item>

                <nb-item stackedLabel>
                    <nb-label>Numero</nb-label>
                    <nb-input v-model="student.number"/>
                </nb-item>

                <nb-item stackedLabel>
                    <nb-label>Complemento</nb-label>
                    <nb-input v-model="student.complement"/>
                </nb-item>

                <nb-item stackedLabel>
                    <nb-label>Bairro</nb-label>
                    <nb-input v-model="student.district"/>
                </nb-item>

                <nb-item stackedLabel>
                    <nb-label>Cidade</nb-label>
                    <nb-input v-model="student.city"/>
                </nb-item>

                <nb-item stackedLabel>
                    <nb-label>Estado</nb-label>
                    <nb-input v-model="student.state"/>
                </nb-item>

                <nb-item stackedLabel>
                    <nb-label>Nome da Mae</nb-label>
                    <nb-input v-model="student.motherName"/>
                </nb-item>

                <nb-item stackedLabel>
                    <nb-label>CPF da Mae</nb-label>
                    <nb-input v-model="student.motherCpf"/>
                </nb-item>

                <nb-item stackedLabel last>
                    <nb-label>Dia Pref. para Pagamento da Mensalidade</nb-label>
                    <nb-input v-model="student.preferredMonthlyPaymentDay"/>
                </nb-item>

                <nb-item class="action-buttons" full>
                    <nb-button danger :on-press="goToHomeScreen">
                        <nb-text>Cancelar</nb-text>
                    </nb-button>
                    <nb-button primar :on-press="saveStudent">
                        <nb-text>Salvar</nb-text>
                    </nb-button>
                </nb-item>
            </nb-form>
        </nb-content>
    </nb-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { Toast } from "native-base";
import React from "react";

export default {
    props: {
        navigation: Object
    },
    data() {
        return {
            student: {},
            defaultDate: new Date('2018-06-04'),
            minimumDate: new Date('2018-01-01'),
            maximumDate: new Date('2018-12-31'),
            chosenDate:  new Date(),
        }
    },
    created() {
        this.student = { ...this.currentStudent };
    },
    methods: {
        ...mapActions(['addStudent', 'editStudent', 'resetCurrentStudent']),
        goToHomeScreen() {
            this.navigation.navigate("Home");
        },
        async saveStudent() {
            try {
                if (this.currentStudent.id || this.currentStudent.id === 0) {
                    await this.editStudent(this.student);
                } else {
                    await this.addStudent(this.student);
                }

                Toast.show({
                    text: "Estudante salvo com sucesso!",
                    buttonText: "Ok",
                    type: "success"
                });
            } catch (e) {
                Toast.show({
                    text: "Falha ao salvar estudante!",
                    buttonText: "Ok",
                    type: "error"
                });
            } finally {
                this.resetCurrentStudent();
                this.navigation.navigate("Home");
            }
        }
    },
    computed: {
        ...mapGetters(['currentStudent']),
        gradeOptions() {
            const gradeOptions = [];

            for (let i = 1; i <= 9; i++) {
                gradeOptions.push({
                    label: i,
                    value: i,
                })
            }

            return gradeOptions;
        }
    },
}
</script>

<style>
.action-buttons {
    margin-top: 10%;
    justify-content: space-evenly;
    align-items: center;
}
</style>
