<template>
  <nav
    class="eblk-navbar eblk-navbar-default eblk-navbar-fixed-top"
    role="navigation"
  >
    <div class="container-fluid">
      <div class="eblk-navbar-header">
        <button
          type="button"
          class="eblk-navbar-toggle collapsed eblk-mobile-menu"
          data-toggle="collapse"
          data-target=".navbar-1"
        >
          <font-awesome-icon :icon="['fa', 'bars']" />
        </button>

        <div class="eblk-navbar-brand">
          <router-link to="/">
            <img
              class="einblik-logo"
              src="/img/eblk_logo.svg"
              alt="VSuite Logo"
            />
            <img
              class="einblik-icon"
              src="/img/eblk_logo_tria.svg"
              alt="VSuite icon"
            />
          </router-link>
        </div>
      </div>
      <div class="eblk-navbar-collapse collapse navbar-1">
        <ul class="eblk-nav eblk-navbar-nav eblk-navbar-right">
          <li v-if="!$auth.isAuthenticated && !$auth.loading">
            <a class="eblk-btn eblk-btn-signin" @click="login">
              {{ $t("main_nav.login") }}
            </a>
          </li>

          <li v-if="!$auth.isAuthenticated && !$auth.loading">
            <a class="eblk-btn eblk-btn-signup" @click="login">
              {{ $t("main_nav.signup") }}
            </a>
          </li>

          <li v-if="$auth.isAuthenticated" class="account-status">
            <p>
              {{ $t("main_nav.active_profile") }}:
              <span>{{ $auth.user.name }}</span>
            </p>
          </li>

          <li v-if="$auth.isAuthenticated" class="menu-icon dropdown">
            <span
              class="eblk-icon-avatar dropdown-toggle"
              data-toggle="dropdown"
              aria-hidden="true"
            >
              <font-awesome-icon icon="cog" />
            </span>

            <ul class="dropdown-menu">
              <li class="menu-item">
                <router-link to="/">
                  <font-awesome-icon icon="link" aria-hidden="true" />&nbsp;
                  <span>{{ $t("main_nav.my_links") }}</span>
                </router-link>
              </li>
              <li class="divider"></li>
              <li>
                <a
                  class="add-group"
                  data-toggle="modal"
                  data-target="#create-group"
                >
                  <font-awesome-icon
                    icon="user-plus"
                    aria-hidden="true"
                  />&nbsp;
                  <span>{{ $t("main_nav.add_organization") }}</span>
                </a>
              </li>
              <li>
                <a href="/custom-domain">
                  <font-awesome-icon icon="globe" aria-hidden="true" />&nbsp;
                  <span>{{ $t("main_nav.custom_domain") }}</span>
                </a>
              </li>
              <li>
                <a href="/subscription">
                  <font-awesome-icon
                    icon="credit-card"
                    aria-hidden="true"
                  />&nbsp;
                  <span>{{ $t("main_nav.subscription") }}</span>
                </a>
              </li>
              <li>
                <a href="/settings" class="edit profile">
                  <font-awesome-icon icon="edit" aria-hidden="true" />&nbsp;
                  <span>{{ $t("main_nav.settings") }}</span>
                </a>
              </li>
              <li class="menu-item">
                <a href="/help" class="">
                  <font-awesome-icon
                    icon="question-circle"
                    aria-hidden="true"
                  />&nbsp;
                  <span>{{ $t("main_nav.help") }}</span>
                </a>
              </li>
              <li class="menu-item">
                <a>
                  <font-awesome-icon icon="tree" aria-hidden="true" />&nbsp;
                  <router-link to="/tree">Tree</router-link>
                </a>
              </li>
              <li class="menu-item">
                <a>
                  <font-awesome-icon icon="list-ol" aria-hidden="true" />&nbsp;
                  <router-link to="/kpi-list">Kpi list</router-link>
                </a>
              </li>

              <li class="divider"></li>
              <li>
                <a class="logout" @click.prevent="logout">
                  <font-awesome-icon
                    icon="power-off"
                    aria-hidden="true"
                  />&nbsp;
                  <span>{{ $t("main_nav.logout") }}</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      this.$auth.logout();
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style>
#mobileAuthNavBar {
  min-height: 125px;
  justify-content: space-between;
}
</style>
