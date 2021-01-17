import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import './../node_modules/bulma/css/bulma.css';
import './../node_modules/bootstrap/dist/css/bootstrap.css';
import Vuelidate from "vuelidate";
import VueRouter from 'vue-router';
import VueTableDynamic from 'vue-table-dynamic';


// Import the Auth0 configuration
//import { domain, clientId } from "../auth_config.json";

// Import the plugin here
Vue.use(Vuelidate,VueRouter,VueTableDynamic);
import { Auth0Plugin } from "./auth";

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
    //  domain,
    // clientId,
    axios,
    onRedirectCallback: appState => {
        router.push(
            appState && appState.targetUrl ?
            appState.targetUrl :
            window.location.pathname
        );
    }
});

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')