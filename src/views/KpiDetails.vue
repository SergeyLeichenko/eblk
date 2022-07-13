<template name="KpiDetails">
    <div class="content">
        <ul v-if="errors && errors.length">
            <li v-for="error of errors" :key="error.message">{{error.message}}</li>
        </ul>
        <p>Details for KPI: {{ this.$route.params.id }}</p>
        <form @submit.prevent="addValue">
            <BaseInput v-model="val" type="text" placeholder="Value?" name="val"
                       @blur="$v.val.$touch()"/>
            <BaseButton type="submit">Add</BaseButton>
            <template v-if="$v.val.$error">
                <p v-if="!$v.val.required" class="errorMessage">Value is required.</p>
            </template>
        </form>
        <br/>
        <table class="table table-striped">
            <thead>
            <tr>
                <th>Value</th>
                <th>CreatedAt</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="value in values" :key="value.id">
                <td>{{ value.val }}</td>
                <td>{{ format_date(value.crt) }}</td>
                <td>
                    <BaseButton @click="deleteValue(value)">Delete</BaseButton>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import moment from 'moment'
    import {required} from 'vuelidate/lib/validators'

    export default {
        data() {
            return {
                errors: [],
                val: ''
            };
        },

        computed: {
            values() {
                return this.$store.state.value.valueList
            },
        },

        methods: {
            addValue() {
                this.$v.$touch()
                if (this.$v.$invalid) {
                    this.$alert("Value is required.");
                    return;
                }
                this.$store.dispatch('value/createValue', {'kid': this.$route.params.id, 'val': this.val, 'crt': moment().format('YYYY-MM-DD')});
                this.val = '';
            },

            deleteValue(value) {
                this.$store.dispatch('value/removeValue', {'value': value, 'id': this.$route.params.id});
            },

            format_date(value){
                if (value) {
                    return moment(String(value)).format('YYYY-MM-DD')
                }
            },
        },

        validations: {
            val: {required}
        },
    };
</script>

<style>
</style>
