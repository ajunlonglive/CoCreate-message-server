'use strict';

const message = require('./src/message');

module.exports.init = function(socket_server, db_client) {
    new message(socket_server, db_client);
}