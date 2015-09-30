//----------------------------------------------------------------------------------------------------------------------
/// A simple template loader for Vue components
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

import axios from 'axios'

import Vue from 'vue'

//----------------------------------------------------------------------------------------------------------------------

function extend(vueOpts)
{
    if(vueOpts.templateUrl)
    {
        return function(resolve, reject)
        {
            return axios.get(vueOpts.templateUrl)
                .then((response) =>
                {
                    delete vueOpts.templateUrl;
                    vueOpts.template = response.data;

                    resolve(Vue.extend(vueOpts));
                })
                .catch((response) =>
                {
                    if(response instanceof Error)
                    {
                        reject(response);
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
        };
    }
    else
    {
        return Vue.extend(vueOpts);
    } // end if
} // end extend

function component(componentName, vueOpts)
{
    return Vue.component(componentName, extend(vueOpts));
} // end component

//----------------------------------------------------------------------------------------------------------------------

export default { component, extend };

//----------------------------------------------------------------------------------------------------------------------