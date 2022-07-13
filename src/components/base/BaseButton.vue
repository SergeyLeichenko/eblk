<template>
    <span>
        <button v-on="$listeners" v-bind="$attrs" :class="buttonClass">
            <slot/>
        </button>
    </span>
</template>

<script>
    export default {
        inheritAttrs: false,
        props: {
            buttonClass: {
                type: String
            }
        }
    }
</script>
