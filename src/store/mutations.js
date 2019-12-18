import { AsyncStorage } from "react-native";

function updateStorage(students) {
    AsyncStorage.setItem('@StudendsCrud:students', JSON.stringify(students), null);
}

export function GET_STUDENT(state, id) {
    return state[id];
}

export function SET_CURRENT_STUDENT(state, data) {
    state.currentStudent = data;
}

export function SET_STUDENTS(state, data) {
    state.students = data;
}

export function ADD_STUDENT(state, data) {
    state.students.push({
        id: state.students.length,
        ...data
    });
    updateStorage(state.students);
}

export function EDIT_STUDENT(state, data) {
    const { id } = data;
    const student = state.students[id];

    if (!student) {
        return;
    }

    Object.assign(student, data);
    updateStorage(state.students);
}

export function REMOVE_STUDENT(state, id) {
    const student = state.students[id];

    if (!student) {
        return;
    }

    state.students.splice(id, 1);
    updateStorage(state.students);
}
