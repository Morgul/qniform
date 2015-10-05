//----------------------------------------------------------------------------------------------------------------------
/// Navbar component
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

import _ from 'lodash';

import vueLoader from '../loader/vueLoader';
import personaSvc from '../persona/personaService';

//----------------------------------------------------------------------------------------------------------------------

vueLoader.component('navbar', {
    name: 'Navbar',
    templateUrl: '/components/navbar/navbar.html',
    data: function()
    {
        return {
            user: personaSvc.currentUser
        };
    },
    computed: {
        loggedIn: function()
        {
            return !!this.user.email;
        },
        display: function()
        {
            return this.user.name || this.user.email;
        }
    },
    methods: {
        signIn: function()
        {
            personaSvc.signIn();
        },
        signOut: function()
        {
            personaSvc.signOut();
        }
    }
});

//----------------------------------------------------------------------------------------------------------------------