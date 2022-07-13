<template>
  <div id="app" class="wrapper">
    <nav-bar />
    <NotificationContainer/>
    <div class="container flex-grow-3">
      <error />
      <div class="mt-5">
        <router-view />
      </div>
    </div>
    <app-footer />
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Error from "./components/Error";
import AppFooter from "./components/AppFooter";
import NotificationContainer from '@/components/NotificationContainer.vue'

export default {
  components: {
    NavBar,
    Error,
    AppFooter,
    NotificationContainer
  }
};
</script>

<style>
  .error {
    border: 1px solid red;
  }

  .errorMessage {
    color: red;
  }

  .-text-error {
    color: tomato;
  }

  .-text-success {
    color: green;
  }
</style>
