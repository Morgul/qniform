//----------------------------------------------------------------------------------------------------------------------
/// Main Client-side Application
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

import Vue from 'vue';
import VueRouter from 'vue-router';

//----------------------------------------------------------------------------------------------------------------------

Vue.use(VueRouter);

//----------------------------------------------------------------------------------------------------------------------

// Services
import eventSvc from './components/events/eventService';
import routerSvc from './components/router/routerService';
import personaSvc from './components/persona/personaService';

// Pages
import HomeComponent from './pages/home/home';
import DashboardComponent from './pages/dashboard/dashboard';

// Components
import './components/navbar/navbar';
import './components/test_tag/test';

//----------------------------------------------------------------------------------------------------------------------
// App Setup
//----------------------------------------------------------------------------------------------------------------------

var app = new Vue({});

//----------------------------------------------------------------------------------------------------------------------
// Router
//----------------------------------------------------------------------------------------------------------------------

routerSvc.setup({
    history: true,
    saveScrollPosition: true
});

routerSvc.map({
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
routerSvc.start(app, '#main-app');

// Setup Event Service
eventSvc.init(routerSvc.app);

//----------------------------------------------------------------------------------------------------------------------
