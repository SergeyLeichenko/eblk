<template>
  <div>
    <welcome />
  </div>
</template>

<script>
import Welcome from "../components/Welcome";

export default {
  name: "home",
  components: {
    Welcome
  }
};
</script>

<style lang="scss" scoped>
.next-steps {
  .fa-link {
    margin-right: 5px;
  }
}
</style>
