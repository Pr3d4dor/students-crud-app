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
                <nb-item stackedLabel
                     :error="$v.name.$error && $v.name.$dirty"
                     :success="!$v.name.$error && $v.name.$dirty"
                >
                    <nb-label>Nome</nb-label>
                    <nb-input v-model="name" :on-blur="() => $v.name.$touch()" autoFocus autoCapitalize="words"/>
                </nb-item>

                <nb-item stackedLabel
                     :error="$v.grade.$error && $v.grade.$dirty"
                     :success="!$v.grade.$error && $v.grade.$dirty"
                >
                    <nb-label>Serie de Ingresso</nb-label>
                    <nb-input v-model="grade" :on-blur="() => $v.grade.$touch()" keyboardType="numeric"/>
                </nb-item>

                <nb-item stackedLabel
                     :error="$v.birthdate.$error && $v.birthdate.$dirty"
                     :success="!$v.birthdate.$error && $v.birthdate.$dirty"
                >
                    <nb-label>Data de Nascimento</nb-label>
                    <nb-date-picker
                        :defaultDate="defaultDate"
                        :minimumDate="minimumDate"
                        :maximumDate="maximumDate"
                        :modalTransparent="false"
                        animationType="fade"
                        androidMode="default"
                        :onDateChange="setBirthdate"
                        :on-blur="() => $v.birthdate.$touch()"
                    />
                </nb-item>

                <nb-item stackedLabel
                     :error="$v.cep.$error && $v.cep.$dirty"
                     :success="!$v.cep.$error && $v.cep.$dirty"
                >
                    <nb-label>CEP</nb-label>
                    <nb-input v-model="cep" :on-complete="() => $v.cep.$touch()" keyboardType="numeric"/>
                </nb-item>

                <nb-item stackedLabel
                     :error="$v.street.$error && $v.street.$dirty"
                     :success="!$v.street.$error && $v.street.$dirty"
                >
                    <nb-label>Rua</nb-label>
                    <nb-input v-model="street" :on-blur="() => $v.street.$touch()"/>
                </nb-item>

                <nb-item stackedLabel
                     :error="$v.number.$error && $v.number.$dirty"
                     :success="!$v.number.$error && $v.number.$dirty"
                >
                    <nb-label>Numero</nb-label>
                    <nb-input v-model="number" :on-blur="() => $v.number.$touch()" keyboardType="numeric"/>
                </nb-item>

                <nb-item stackedLabel>
                    <nb-label>Complemento</nb-label>
                    <nb-input v-model="complement" />
                </nb-item>

                <nb-item stackedLabel
                     :error="$v.district.$error && $v.district.$dirty"
                     :success="!$v.district.$error && $v.district.$dirty"
                >
                    <nb-label>Bairro</nb-label>
                    <nb-input v-model="district" :on-blur="() => $v.district.$touch()"/>
                </nb-item>

                <nb-item stackedLabel
                     :error="$v.city.$error && $v.city.$dirty"
                     :success="!$v.city.$error && $v.city.$dirty"
                >
                    <nb-label>Cidade</nb-label>
                    <nb-input v-model="city" :on-blur="() => $v.city.$touch()"/>
                </nb-item>

                <nb-item stackedLabel
                     :error="$v.state.$error && $v.state.$dirty"
                     :success="!$v.state.$error && $v.state.$dirty"
                >
                    <nb-label>Estado</nb-label>
                    <nb-input v-model="state" :on-blur="() => $v.state.$touch()"/>
                </nb-item>

                <nb-item stackedLabel
                     :error="$v.motherName.$error && $v.motherName.$dirty"
                     :success="!$v.motherName.$error && $v.motherName.$dirty"
                >
                    <nb-label>Nome da Mae</nb-label>
                    <nb-input v-model="motherName" :on-blur="() => $v.motherName.$touch()"/>
                </nb-item>

                <nb-item stackedLabel
                     :error="$v.motherCpf.$error && $v.motherCpf.$dirty"
                     :success="!$v.motherCpf.$error && $v.motherCpf.$dirty"
                >
                    <nb-label>CPF da Mae</nb-label>
                    <nb-input v-model="motherCpf" :on-blur="() => $v.motherCpf.$touch()" keyboardType="numeric"/>
                </nb-item>

                <nb-item stackedLabel
                     :error="$v.preferredMonthlyPaymentDay.$error && $v.preferredMonthlyPaymentDay.$dirty"
                     :success="!$v.preferredMonthlyPaymentDay.$error && $v.preferredMonthlyPaymentDay.$dirty"
                >
                    <nb-label>Dia Pref. para Pagamento da Mensalidade</nb-label>
                    <nb-input v-model="preferredMonthlyPaymentDay" :on-blur="() => $v.preferredMonthlyPaymentDay.$touch()" keyboardType="numeric"/>
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
import cep from "cep-promise";
import { isCPF } from 'brazilian-values';
import { required, maxLength, numeric } from "vuelidate/lib/validators"

const gradeValidator = value => [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(value));
const cepValidator = value => cep(value);
const cpfValidator = value => isCPF(value);
const preferredMonthlyPaymentDayValidator = value => [5, 10, 15, 20, 25].includes(Number(value));

export default {
    props: {
        navigation: Object
    },
    data() {
        return {
            name: "",
            birthdate: "",
            grade: "",
            cep: "",
            street: "",
            number: "",
            complement: "",
            district: "",
            city: "",
            state: "",
            motherName: "",
            motherCpf: "",
            preferredMonthlyPaymentDay: "",
            defaultDate: new Date('2018-06-04'),
            minimumDate: new Date('2018-01-01'),
            maximumDate: new Date('2018-12-31'),
            chosenDate:  new Date(),
        }
    },
    created() {
        this.$v.$reset();
        this.loadFormValues();
    },
    methods: {
        ...mapActions(['addStudent', 'editStudent', 'resetCurrentStudent']),
        loadFormValues() {
            if (!this.currentStudent) {
                return;
            }

            Object.assign(this, this.currentStudent);
            this.$v.$touch();
        },
        goToHomeScreen() {
            this.navigation.navigate("Home");
        },
        setBirthdate(value) {
            this.birthdate = value;
            this.$v.birthdate.$touch();
        },
        async saveStudent() {
            this.$v.$touch();

            if (this.$v.$invalid) {
                Toast.show({
                    text: "Por favor preencha todos os campos corretamente!",
                    buttonText: "Ok",
                    type: "danger",
                });

                return;
            }

            try {
                if (this.currentStudent.id || this.currentStudent.id === 0) {
                    await this.editStudent(this.formData);
                } else {
                    await this.addStudent(this.formData);
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
                    type: "danger"
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
        },
        formData() {
            return {
                id: this.currentStudent ? this.currentStudent.id : null,
                name: this.name,
                birthdate: this.birthdate,
                grade: this.grade,
                cep: this.cep,
                street: this.street,
                number: this.number,
                complement: this.complement,
                district: this.district,
                city: this.city,
                state: this.state,
                motherName: this.motherName,
                motherCpf: this.motherCpf,
                preferredMonthlyPaymentDay: this.preferredMonthlyPaymentDay,
            }
        },
    },
    validations: {
        name: {
            required,
            maxLength: maxLength(100),
        },
        birthdate: {
            required
        },
        grade: {
            required,
            numeric,
            gradeValidator,
        },
        cep: {
            required,
            cepValidator,
        },
        street: {
            required,
            maxLength: maxLength(120),
        },
        number: {
            required,
            numeric,
        },
        district: {
            required,
            maxLength: maxLength(100),
        },
        city: {
            required,
            maxLength: maxLength(100),
        },
        state: {
            required,
            maxLength: maxLength(2),
        },
        motherName: {
            required,
            maxLength: maxLength(100),
        },
        motherCpf: {
            required,
            cpfValidator
        },
        preferredMonthlyPaymentDay: {
            required,
            numeric,
            preferredMonthlyPaymentDayValidator,
        }
    }
}
</script>

<style>
.action-buttons {
    margin-top: 10%;
    justify-content: space-evenly;
    align-items: center;
}
</style>
