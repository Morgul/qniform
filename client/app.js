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

var app = new Vue({
    //el: '#main-app',
    ready: () =>
    {
        console.log('Application Started.');
    }
});

//----------------------------------------------------------------------------------------------------------------------
// Router
//----------------------------------------------------------------------------------------------------------------------

var router = new VueRouter({
    history: true,
    saveScrollPosition: true
});

router.map({
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

// Setup Event Service
eventSvc.init(app);

// Setup router
router.start(app, '#main-app');

//----------------------------------------------------------------------------------------------------------------------
