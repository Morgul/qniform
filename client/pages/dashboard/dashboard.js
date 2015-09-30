//----------------------------------------------------------------------------------------------------------------------
/// Home Page
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

import vueLoader from '../../components/loader/vueLoader';

//----------------------------------------------------------------------------------------------------------------------

export default vueLoader.extend({
    name: 'Dashboard',
    templateUrl: '/pages/dashboard/dashboard.html',
    data: function()
    {
        return {
            docFilter: "",
            manuscripts: [
                {
                    title: "My Test Story",
                    created: new Date('11-08-84'),
                    updated: new Date('2015-09-28T18:23:45.579Z')
                },
                {
                    title: "Other Stories",
                    created: new Date('9-18-14'),
                    updated: new Date('2-10-15')
                },
                {
                    title: "Alice in VunderLaud",
                    created: new Date('3-21-15'),
                    updated: new Date('4-11-15')
                },
                {
                    title: "Me, You, Writing and Procrastination",
                    created: new Date('12-01-1992'),
                    updated: new Date('1-10-1993')
                }
            ]
        };
    }
});

//----------------------------------------------------------------------------------------------------------------------