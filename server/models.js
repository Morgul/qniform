//----------------------------------------------------------------------------------------------------------------------
// Database models for Qniform
//
// @module models
//----------------------------------------------------------------------------------------------------------------------

import config from '../config'
import setupThinky from  'thinky'

var thinky = setupThinky(config.rethinkdb);
var db = { r: thinky.r, errors: thinky.Errors };

//----------------------------------------------------------------------------------------------------------------------

db.Manuscript = thinky.createModel('manuscripts', {
    title: String,
    userID: String,
    created: { _type: Date, default: Date.now() },
    updated: { _type: Date, default: Date.now() }
});

//----------------------------------------------------------------------------------------------------------------------

db.User = thinky.createModel('users', {
    name: String,
    email: String,
    created: { _type: Date, default: Date.now() }
}, { pk: 'email' });

db.User.hasMany(db.Manuscript, 'manuscripts', 'email', 'userID');

//----------------------------------------------------------------------------------------------------------------------

export default db;

//----------------------------------------------------------------------------------------------------------------------
