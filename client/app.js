//----------------------------------------------------------------------------------------------------------------------
/// Main Client-side Application
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

import Vue from 'vue'

// Services
import eventSvc from './components/events/eventService'
import personaSvc from './components/persona/personaService.js'

// Components
import './components/navbar/navbar'
import './components/test_tag/test'

//----------------------------------------------------------------------------------------------------------------------

var app = new Vue({
    el: "#main-app",
    data: {
        msg: 'Hello'
    },
    computed: {
        fullMsg: function()
        {
            var now = Date.now();
            return `${ this.msg } World (${ now })`;
        }
    }
});

// Setup Event Service
eventSvc.init(app);

//----------------------------------------------------------------------------------------------------------------------

console.log('Application Started.');

//----------------------------------------------------------------------------------------------------------------------
