import apiService from '@/services/api/kpiApiClient.js';

export const namespaced = true;

export const state = {
    kpiList: []
}

export const mutations = {
    ADD_KPI(state, kpi) {
        state.kpiList.push(kpi);
    },

    DEL_KPI(state, kpi) {
        state.kpiList.splice(state.kpiList.indexOf(kpi), 1)
    },

    SET_KPIS(state, kpis) {
        state.kpiList = kpis;
    }
}

export const actions = {
    loadKpis({ commit, dispatch}) {
        return apiService.getKpiList().then(response => {
                commit('SET_KPIS', response.data)
            }
        ).catch(error => {
            const notification = {
                type: 'error',
                message: 'There was a problem fetching kpis list: ' + error.message
            }
            dispatch('notification/add', notification, { root: true })
        })
    },

    createKpi({ commit, dispatch }, kpi) {
        return apiService.postKpi(kpi).then(response => {
            let kpi = response['data'];
                commit('ADD_KPI', kpi)
                const notification = {
                    type: 'success',
                    message: 'Your kpi has been created!'
                }
                dispatch('notification/add', notification, { root: true })
            }).catch(error => {
                const notification = {
                    type: 'error',
                    message: 'There was a problem creating your kpi: ' + error.message
                }
                dispatch('notification/add', notification, { root: true })
                throw error
            })
    },

    removeKpi({ commit, dispatch }, kpi) {
        return apiService.removeKpi(kpi).then(() => {
            commit('DEL_KPI', kpi)
            const notification = {
                type: 'success',
                message: 'Your kpi has been deleted!'
            }
            dispatch('notification/add', notification, { root: true })
        }).catch(error => {
            const notification = {
                type: 'error',
                message: 'There was a problem removing your kpi: ' + error.message
            }
            dispatch('notification/add', notification, { root: true })
            throw error
        })
    }
}
