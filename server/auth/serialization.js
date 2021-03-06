//----------------------------------------------------------------------------------------------------------------------
// Handles user serialization/deserialization
//
// @module
//----------------------------------------------------------------------------------------------------------------------

import passport from 'passport'

import models from '../models'

//----------------------------------------------------------------------------------------------------------------------

passport.serializeUser(function(user, done)
{
    done(null, user.email);
});

passport.deserializeUser(function(email, done)
{
    models.User.get(email)
        .then(function(user)
        {
            done(null, user);
        })
        .catch(models.errors.DocumentNotFound, function()
        {
            done(new Error('User not found.'));
        })
        .catch(function(error)
        {
            done(error);
        });
});

//----------------------------------------------------------------------------------------------------------------------
