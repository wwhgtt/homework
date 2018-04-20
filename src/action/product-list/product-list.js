require('es6-promise');
require('isomorphic-fetch');
const createAction = require('redux-actions').createAction;
const config = require('../../config');

exports.setDemo = createAction('DEMO', viewHash => viewHash);
