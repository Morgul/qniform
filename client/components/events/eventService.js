//----------------------------------------------------------------------------------------------------------------------
/// EventService
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

class EventService {
    init(app)
    {
        this.app = app;
    } // end init

    broadcast()
    {
        this.app.$broadcast.apply(this.app, arguments);
    } // end broadcast

    on()
    {
        this.app.$on.apply(this.app, arguments);
    } // end on

    off()
    {
        this.app.$off.apply(this.app, arguments);
    } // end off
} // end EventService

//----------------------------------------------------------------------------------------------------------------------

export default new EventService();

//----------------------------------------------------------------------------------------------------------------------