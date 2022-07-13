import apiService from '../../services/api/valueApiClient.js';

export const namespaced = true;

export const state = {
    valueList: []
}

export const mutations = {
    ADD_VALUE(state, value) {
        state.valueList.push(value);
    },

    DEL_VALUE(state, value) {
        state.valueList.splice(state.valueList.indexOf(value), 1)
    },

    SET_VALUES(state, values) {
        state.valueList = values;
    }
}

export const actions = {
    loadValues({commit}, kpiId) {
        return apiService.getValueList(kpiId).then(response => {
                commit('SET_VALUES', response.data)

                return response.data
            }
        )
    },

    createValue({commit, dispatch}, value) {
        return apiService.postValue(value).then(response => {
            let value = response['data'];
            commit('ADD_VALUE', value)
            const notification = {
                type: 'success',
                message: 'Your value has been created!'
            }
            dispatch('notification/add', notification, {root: true})
        }).catch(error => {
            const notification = {
                type: 'error',
                message: 'There was a problem creating your value: ' + error.message
            }
            dispatch('notification/add', notification, {root: true})
            throw error
        })
    },

    removeValue({commit, dispatch}, data) {
        return apiService.removeValue(data.value, data.id).then(() => {
            commit('DEL_VALUE', data.value)
            const notification = {
                type: 'success',
                message: 'Your value has been deleted!'
            }
            dispatch('notification/add', notification, {root: true})
        }).catch(error => {
            const notification = {
                type: 'error',
                message: 'There was a problem removing your value: ' + error.message
            }
            dispatch('notification/add', notification, {root: true})
            throw error
        })
    }
}
