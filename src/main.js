import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { Auth0Plugin } from "./auth";
import HighlightJs from "./directives/highlight";
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faLink,
  faUser,
  faPowerOff,
  faBars,
  faCog,
  faUserPlus,
  faGlobe,
  faCreditCard,
  faEdit,
  faQuestionCircle,
  faTree,
  faListOl
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { domain, clientId } from "../auth_config.json";
import Vuelidate from "vuelidate"
Vue.use(Vuelidate)

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'nprogress/nprogress.css'

import "./assets/styles/main.css";
import i18n from "./i18n";

import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert);

import store from './store/store'

// configure logger
import VueLogger from 'vuejs-logger';
const isProduction = process.env.NODE_ENV === 'production';

const loggerOptions = {
    isEnabled: true,
    logLevel : isProduction ? 'error' : 'debug',
    stringifyArguments : false,
    showLogLevel : true,
    showMethodName : true,
    separator: '|',
    showConsoleColors: true
};

Vue.use(VueLogger, loggerOptions);

library.add(faLink, faUser, faPowerOff, faBars, faCog, faUserPlus, faGlobe, faCreditCard, faEdit, faQuestionCircle, faTree, faListOl);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

const requireComponent = require.context(
    './components/base',
    false,
    /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)

    const componentName = upperFirst(
        camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
    )

    Vue.component(componentName, componentConfig.default || componentConfig)
})

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

Vue.directive("highlightjs", HighlightJs);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
