//----------------------------------------------------------------------------------------------------------------------
// Persona Controller
//----------------------------------------------------------------------------------------------------------------------

import http from 'axios';

import eventSvc from '../events/eventService';
import routerSvc from '../router/routerService';

//----------------------------------------------------------------------------------------------------------------------

class PersonaService
{
    constructor()
    {
        this.currentUser = null;
        this.loginUrl = '/auth/login-persona';
        this.logoutUrl = '/auth/logout-persona';

        // Register for the Persona events
        navigator.id.watch({
            loggedInUser: this.currentUser,
            onlogin: this._onLogIn.bind(this),
            onlogout: this._onLogOut.bind(this)
        });
    } // end constructor

    _onLogIn(assertion)
    {
        http.post(this.loginUrl, { assertion })
            .then((response) =>
            {
                this.currentUser = response.data;
                eventSvc.broadcast('logged in', this.currentUser);
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
                this.currentUser = null;
                eventSvc.broadcast('logged out');
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
        navigator.id.logout();
    } // end signOut
} // end PersonaService

//----------------------------------------------------------------------------------------------------------------------

export default new PersonaService();

//----------------------------------------------------------------------------------------------------------------------
