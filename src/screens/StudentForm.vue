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
                    <nb-input v-model="name" :on-blur="() => $v.name.$touch()" autoFocus autoCapitalize="words" :maxLength="100"/>
                </nb-item>

                <nb-item stackedLabel
                     :error="$v.grade.$error && $v.grade.$dirty"
                     :success="!$v.grade.$error && $v.grade.$dirty"
                >
                    <nb-label>Serie de Ingresso</nb-label>
                    <nb-input v-model="grade" :on-blur="() => $v.grade.$touch()" keyboardType="numeric" :maxLength="1"/>
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
                     :error="$v.postcode.$error && $v.postcode.$dirty"
                     :success="!$v.postcode.$error && $v.postcode.$dirty"
                >
                    <nb-label>CEP</nb-label>
                    <nb-input v-model="postcode" :on-blur="onPostcodeComplete" keyboardType="numeric" :maxLength="8"/>
                </nb-item>

                <nb-item stackedLabel
                     :error="$v.street.$error && $v.street.$dirty"
                     :success="!$v.street.$error && $v.street.$dirty"
                >
                    <nb-label>Rua</nb-label>
                    <nb-input v-model="street" :on-blur="() => $v.street.$touch()" :maxLength="120"/>
                </nb-item>

                <nb-item stackedLabel
                     :error="$v.number.$error && $v.number.$dirty"
                     :success="!$v.number.$error && $v.number.$dirty"
                >
                    <nb-label>Numero</nb-label>
                    <nb-input v-model="number" :on-blur="() => $v.number.$touch()" keyboardType="numeric" />
                </nb-item>

                <nb-item stackedLabel
                     :error="$v.complement.$error && $v.complement.$dirty"
                     :success="!$v.complement.$error && $v.complement.$dirty"
                >
                    <nb-label>Complemento</nb-label>
                    <nb-input v-model="complement" :on-blur="() => $v.complement.$touch()" :maxLength="50" />
                </nb-item>

                <nb-item stackedLabel
                     :error="$v.neighborhood.$error && $v.neighborhood.$dirty"
                     :success="!$v.neighborhood.$error && $v.neighborhood.$dirty"
                >
                    <nb-label>Bairro</nb-label>
                    <nb-input v-model="neighborhood" :on-blur="() => $v.neighborhood.$touch()" :maxLength="100"/>
                </nb-item>

                <nb-item stackedLabel
                     :error="$v.city.$error && $v.city.$dirty"
                     :success="!$v.city.$error && $v.city.$dirty"
                >
                    <nb-label>Cidade</nb-label>
                    <nb-input v-model="city" :on-blur="() => $v.city.$touch()" :maxLength="100"/>
                </nb-item>

                <nb-item stackedLabel
                     :error="$v.state.$error && $v.state.$dirty"
                     :success="!$v.state.$error && $v.state.$dirty"
                >
                    <nb-label>Estado</nb-label>
                    <nb-input v-model="state" :on-blur="() => $v.state.$touch()" :maxLength="2"/>
                </nb-item>

                <nb-item stackedLabel
                     :error="$v.motherName.$error && $v.motherName.$dirty"
                     :success="!$v.motherName.$error && $v.motherName.$dirty"
                >
                    <nb-label>Nome da Mae</nb-label>
                    <nb-input v-model="motherName" :on-blur="() => $v.motherName.$touch()" :maxLength="100"/>
                </nb-item>

                <nb-item stackedLabel
                     :error="$v.motherCpf.$error && $v.motherCpf.$dirty"
                     :success="!$v.motherCpf.$error && $v.motherCpf.$dirty"
                >
                    <nb-label>CPF da Mae</nb-label>
                    <nb-input v-model="motherCpf" :on-blur="() => $v.motherCpf.$touch()" keyboardType="numeric" :maxLength="8"/>
                </nb-item>

                <nb-item stackedLabel
                     :error="$v.preferredDayForMonthlyPayment.$error && $v.preferredDayForMonthlyPayment.$dirty"
                     :success="!$v.preferredDayForMonthlyPayment.$error && $v.preferredDayForMonthlyPayment.$dirty"
                >
                    <nb-label>Dia Preferencial para Pagamento da Mensalidade (5, 10, 15, 20 ou 25)</nb-label>
                    <nb-input v-model="preferredDayForMonthlyPayment" :on-blur="() => $v.preferredDayForMonthlyPayment.$touch()" keyboardType="numeric" :maxLength="1"/>
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
import camelCaseKeys from "camelcase-keys";
import moment from "moment";

const gradeValidator = value => [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(value));
const cpfValidator = value => isCPF(value);
const preferredDayForMonthlyPaymentValidator = value => [5, 10, 15, 20, 25].includes(Number(value));

export default {
    props: {
        navigation: Object
    },
    data() {
        return {
            name: "",
            birthdate: new Date('1990-01-02'),
            grade: "",
            postcode: "",
            street: "",
            number: "",
            complement: "",
            neighborhood: "",
            city: "",
            state: "",
            motherName: "",
            motherCpf: "",
            preferredDayForMonthlyPayment: "",
            minimumDate: new Date('1900-01-01'),
            maximumDate: new Date(),
        }
    },
    created() {
        this.$v.$reset();
        this.loadFormValues();
    },
    methods: {
        ...mapActions(['addStudent', 'editStudent', 'resetCurrentStudent']),
        loadFormValues() {
            this.$v.$reset();

            if (!this.currentStudent) {
                return;
            }

            const values = camelCaseKeys(this.currentStudent);
            for (let key of Object.keys(values)) {
                values[key] = String(values[key]);
            }

            Object.assign(this, values);
            this.$v.$touch();
        },
        goToHomeScreen() {
            this.navigation.navigate("Home");
        },
        setBirthdate(value) {
            this.birthdate = moment(value).format('DD/MM/YYYY');
            this.$v.birthdate.$touch();
        },
        async onPostcodeComplete() {
            if (!this.postcode || this.postcode.length < 8) {
                return;
            }

            const addressFields = ['city', 'neighborhood', 'state', 'street'];
            try {
                const response = await cep(this.postcode);

                Object.assign(this, response);

                for (let field of addressFields) {
                    this.$v[field].$touch();
                }
            } catch(e) {
                for (let field of addressFields) {
                    this[field] = "";
                    this.$v[field].$touch();
                }
            }
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
                if (this.currentStudent) {
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
                console.log({ e });
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
        defaultDate() {
          if (!this.currentStudent || !this.currentStudent.birthdate) {
              return this.birthdate;
          }

          return moment(this.currentStudent.birthdate, "DD/MM/YYYY").toDate();
        },
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
                postcode: this.postcode,
                street: this.street,
                number: this.number,
                complement: this.complement,
                neighborhood: this.neighborhood,
                city: this.city,
                state: this.state,
                motherName: this.motherName,
                motherCpf: this.motherCpf,
                preferredDayForMonthlyPayment: this.preferredDayForMonthlyPayment,
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
        postcode: {
            required,
        },
        street: {
            required,
            maxLength: maxLength(120),
        },
        number: {
            required,
            numeric,
        },
        complement: {
            maxLength: maxLength(50),
        },
        neighborhood: {
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
        preferredDayForMonthlyPayment: {
            required,
            numeric,
            preferredDayForMonthlyPaymentValidator,
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
