//----------------------------------------------------------------------------------------------------------------------
/// Main Client-side Application
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

import Vue from 'vue';
import VueRouter from 'vue-router';

// Services
import RouterSvc from './components/router/routerService';

// Pages
import HomeComponent from './pages/home/home.vue';
import DashboardComponent from './pages/dashboard/dashboard.vue';

// Filters
import './components/moment/momentFilters';

// Components
import navbar from './components/navbar/navbar.vue';

//----------------------------------------------------------------------------------------------------------------------
// App Setup
//----------------------------------------------------------------------------------------------------------------------

Vue.config.debug = true;
Vue.use(VueRouter);

var app = Vue.extend({
    components: {
        navbar
    }
});

//----------------------------------------------------------------------------------------------------------------------
// Router
//----------------------------------------------------------------------------------------------------------------------

RouterSvc.setup({
    history: true,
    saveScrollPosition: true,
    linkActiveClass: 'active'
});

RouterSvc.map({
    '/': {
        name: 'home',
        component: HomeComponent
    },
    '/dashboard': {
        name: 'dashboard',
        component: DashboardComponent
    }
});

//----------------------------------------------------------------------------------------------------------------------
// Service Setup
//----------------------------------------------------------------------------------------------------------------------

// Setup router
RouterSvc.start(app, '#main-app');

//----------------------------------------------------------------------------------------------------------------------
