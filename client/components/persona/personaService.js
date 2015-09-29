//----------------------------------------------------------------------------------------------------------------------
// Persona Controller
//----------------------------------------------------------------------------------------------------------------------

import axios from 'axios'

import eventSvc from '../events/eventService'

//----------------------------------------------------------------------------------------------------------------------

class PersonaService
{
    constructor()
    {
        this.currentUser = null;
        this.loginUrl = '/login';
        this.logoutUrl = '/logout';

        // Register for the Persona events
        navigator.id.watch({
            loggedInUser: this.currentUser,
            onlogin: this._onLogIn.bind(this),
            onlogout: this._onLogOut.bind(this)
        });
    } // end constructor

    _onLogIn(assertion)
    {
        console.log('_onLogIn:', this.currentUser);
        axios.post(this.loginUrl, { assertion })
            .then((response) =>
            {
                this.currentUser = response.data.user;
                eventSvc.broadcast('logged in', this.currentUser);
            })
            .catch((response) =>
            {
                console.error('Logout Failed:', response);
                this.signOut();
            });
    } // end _onLogIn

    _onLogOut()
    {
        console.log('_onLogOut:', this.currentUser);
        axios.post(this.logoutUrl, {})
            .then(() =>
            {
                this.signOut();
                this.currentUser = null;
                eventSvc.broadcast('logged out');
                //location.href = '/';
            })
            .catch((response) =>
            {
                console.error('Logout Failed:', response);
            });
    } // end _onLogOut

    signIn()
    {
        navigator.id.request();
    }

    signOut()
    {
        navigator.id.logout();
    } // end signOut
} // end PersonaService

//----------------------------------------------------------------------------------------------------------------------

export default new PersonaService();

//----------------------------------------------------------------------------------------------------------------------
