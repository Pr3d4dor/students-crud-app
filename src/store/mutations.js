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
        ...data,
    });
}

export function EDIT_STUDENT(state, data) {
    const { id } = data;
    const student = state.students.find(student => student.id === id);

    if (!student) {
        return;
    }

    Object.assign(student, data);
}

export function REMOVE_STUDENT(state, id) {
    const index = state.students.findIndex(student => student.id === id);

    if (index === -1) {
        return;
    }

    state.students.splice(index, 1);
}

export function TOGGLE_LOADING(state) {
    state.loading = !state.loading;
}
