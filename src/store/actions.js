import api from "../services/api";
import snakeCaseKeys from "snakecase-keys";
import moment from "moment";

function formatData(data) {
    const formattedData = snakeCaseKeys(data);

    console.log({ formattedData });

    return formattedData;
}

export function setCurrentStudent({ commit }, data) {
    commit('SET_CURRENT_STUDENT', data);
}

export function resetCurrentStudent({ commit }) {
    commit('SET_CURRENT_STUDENT', null);
}

export async function addStudent({ commit }, data) {
    try {
        const response = await api.post('/api/students', formatData(data));
        const student = response.data.data;
        commit('ADD_STUDENT', student);
    } catch (e) {
        console.log(e);
    }
}

export async function editStudent({ commit }, data) {
    const { id } = data;
    const response = await api.put(`/api/students/${id}`, formatData(data));
    const student = response.data.data;
    commit('EDIT_STUDENT', student);
}

export async function removeStudent({ commit }, id) {
    await api.delete(`/api/students/${id}`);
    commit('REMOVE_STUDENT', id);
}

export async function loadAllStudents({ commit }) {
    commit('TOGGLE_LOADING');

    try {
        const response = await api.get('/api/students');
        commit('SET_STUDENTS', response.data.data);
    } catch (e) {
        commit('SET_STUDENTS', []);
    }

    commit('TOGGLE_LOADING');
}
