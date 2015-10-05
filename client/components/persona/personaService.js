//----------------------------------------------------------------------------------------------------------------------
// Persona Controller
//----------------------------------------------------------------------------------------------------------------------

import _ from 'lodash';
import http from 'axios';

import routerSvc from '../router/routerService';

//----------------------------------------------------------------------------------------------------------------------

class PersonaService
{
    constructor()
    {
        // This object needs to not be over written, because Vue creates getters/setters for the properties on it.
        this.currentUser = {
            name: "",
            email: "",
            created: ""
        };

        this.loginUrl = '/auth/login-persona';
        this.logoutUrl = '/auth/logout-persona';

        // Register for the Persona events
        navigator.id.watch({
            loggedInUser: this.currentUser.email,
            onlogin: this._onLogIn.bind(this),
            onlogout: this._onLogOut.bind(this)
        });
    } // end constructor

    _clearUser()
    {
        this.currentUser.name = "";
        this.currentUser.email = "";
        this.currentUser.created = "";
    } // end _clearUser

    _onLogIn(assertion)
    {
        http.post(this.loginUrl, { assertion })
            .then((response) =>
            {
                // Assign to the properties
                _.assign(this.currentUser, response.data);
                routerSvc.go('/dashboard');
            })
            .catch((response) =>
            {
                console.error('Logout Failed:', response);
                this.signOut();
            });
    } // end _onLogIn

    _onLogOut()
    {
        http.post(this.logoutUrl, {})
            .then(() =>
            {
                this.signOut();
                routerSvc.go('/');
            })
            .catch((response) =>
            {
                console.error('Logout Failed:', response);
            });
    } // end _onLogOut

    signIn()
    {
        navigator.id.request();
    } // end signIn

    signOut()
    {
        this._clearUser();
        navigator.id.logout();
    } // end signOut
} // end PersonaService

//----------------------------------------------------------------------------------------------------------------------

export default new PersonaService();

//----------------------------------------------------------------------------------------------------------------------
