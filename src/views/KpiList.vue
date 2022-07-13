<template name="kpiList">
    <div class="content">
        <ul v-if="errors && errors.length">
            <li v-for="error of errors" :key="error.message">{{error.message}}</li>
        </ul>
        <form @submit.prevent="addKpi">
            <BaseInput v-model="key" type="text" placeholder="KPI key?" name="key"
                       @blur="$v.key.$touch()"/>
            <BaseInput v-model="description" type="text" placeholder="KPI KPI description?" name="KPI description"/>
            <BaseButton type="submit">Add</BaseButton>
            <template v-if="$v.key.$error">
                <p v-if="!$v.key.required" class="errorMessage">Key is required.</p>
            </template>
        </form>
        <br/>
        <table class="table table-striped">
            <thead>
            <tr>
                <th>Key</th>
                <th>Description</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody v-if="kpis && kpis.length">
            <tr v-for="kpi in kpis" :key="kpi.id">
                <td>
                    <router-link :to="{ name: 'kpi-details', params: { id: kpi.id } }">
                        {{ kpi.key }}
                    </router-link>
                </td>
                <td>{{ kpi.dsc }}</td>
                <td>
                    <BaseButton @click="deleteKpi(kpi)">Delete</BaseButton>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import {required} from 'vuelidate/lib/validators'

    export default {
        data() {
            return {
                errors: [],
                key: "",
                description: ""
            };
        },

        computed: {
            kpis() {
                return this.$store.state.kpi.kpiList
            },
        },

        methods: {
            addKpi() {
                this.$v.$touch()
                if (this.$v.$invalid) {
                    this.$alert("Key is required.");
                    return;
                }
                if (keyExist(this.kpis, this.key)) {
                    this.$alert("Kpi with key '" + this.key + "' already exists");
                    return;
                }

                this.$store.dispatch('kpi/createKpi', {
                    'cid': process.env.VUE_APP_VTN_CID,
                    'key': 'VTN.LI.' + this.key,
                    'dsc': '#_VTN_LI_' + this.description
                });
                this.description = '';
                this.key = '';

                function keyExist(kpis, key) {
                    let state = false;
                    let count = kpis.filter(function (kpi) {
                        if (kpi.key === 'VTN.LI.' + key) return kpi;
                    });
                    if (count.length > 0) state = true;

                    return state;
                }
            },

            deleteKpi(kpi) {
                this.$store.dispatch('kpi/removeKpi', kpi);
            }
        },
        validations: {
            key: {required}
        },
    };
</script>

<style>
</style>
