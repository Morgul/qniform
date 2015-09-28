//----------------------------------------------------------------------------------------------------------------------
/// A simple template loader for Vue components
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

import axios from 'axios'

import Vue from 'vue'

//----------------------------------------------------------------------------------------------------------------------

function component(componentName, vueOpts)
{
    return Vue.component(componentName, function(resolve, reject)
    {
        if(vueOpts.templateUrl)
        {
            axios.get(vueOpts.templateUrl)
                .then((response) =>
                {
                    delete vueOpts.templateUrl;
                    vueOpts.template = response.data;

                    resolve(vueOpts);
                })
                .catch((response) =>
                {
                    if (response instanceof Error)
                    {
                        reject(response)
                    }
                    else
                    {
                        if(response.status == 404)
                        {
                            reject('File not found: "' + vueOpts.templateUrl + '".');
                        }
                        else
                        {
                            reject('Status Code: ' + response.status);
                        } // end if
                    } // end if
                });
        }
        else
        {
            resolve(vueOpts);
        } // end if
    });
} // end component

//----------------------------------------------------------------------------------------------------------------------

module.exports = { component: component };

//----------------------------------------------------------------------------------------------------------------------