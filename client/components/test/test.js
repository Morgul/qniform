//----------------------------------------------------------------------------------------------------------------------
// Test Service Module
//----------------------------------------------------------------------------------------------------------------------

class TestService
{
    constructor()
    {
        this.test = true;
    } // end constructor

    testFunc()
    {
        console.log('this is a test func.');
    } // end testFunc

    testFunc2()
    {
        console.log('this is a second test func.');
    } // end testFunc
} // end TestService

//----------------------------------------------------------------------------------------------------------------------

export default new TestService();

//----------------------------------------------------------------------------------------------------------------------