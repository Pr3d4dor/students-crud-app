export function getStudent({ commit }, id) {
    commit('GET_STUDENT', id);
}

export function setCurrentStudent({ commit }, data) {
    commit('SET_CURRENT_STUDENT', data);
}

export function resetCurrentStudent({ commit }) {
    commit('SET_CURRENT_STUDENT', {});
}

export function addStudent({ commit }, data) {
    commit('ADD_STUDENT', data);
}

export function editStudent({ commit }, data) {
    commit('EDIT_STUDENT', data);
}

export function removeStudent({ commit }, id) {
    commit('REMOVE_STUDENT', id);
}
