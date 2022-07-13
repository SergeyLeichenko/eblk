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
    getValueList(kpiId) {
        return apiClient.get('/vs/' + kpiId)
    },

    postValue(value) {
        return apiClient.post('/v', value)
    },

    removeValue(value, kpiId) {
        return apiClient.delete('/v/' + kpiId + '/' + value.crt)
    }
}
