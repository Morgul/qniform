//----------------------------------------------------------------------------------------------------------------------
/// Navbar component
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

import vueLoader from '../loader/vueLoader'
import personaSvc from '../persona/personaService'

//----------------------------------------------------------------------------------------------------------------------

vueLoader.component('navbar', {
    name: 'Navbar',
    templateUrl: '/components/navbar/navbar.html',
    data: function()
    {
        return {
            user: null
        };
    },
    computed: {
        display: function()
        {
            return this.user ? (this.user.name || this.user.email) : "";
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
    },
    created: function()
    {
        this.$on('logged in', (user) =>
        {
            this.user = user;
        });

        this.$on('logged out', () =>
        {
            this.user = null;
        });
    }
});

//----------------------------------------------------------------------------------------------------------------------