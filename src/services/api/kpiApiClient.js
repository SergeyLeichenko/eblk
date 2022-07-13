import axios from 'axios'

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_KPI_API_BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 10000
})

export default {
    getKpiList() {
        return apiClient.get('/ks/path/VTN')
    },

    postKpi(kpi) {
        return apiClient.post('/k', kpi)
    },

    removeKpi(kpi) {
        return apiClient.delete('/k/' + kpi.id)
    }
}
