#!/usr/bin/env node
/* start.js syncs the database then
 * starts the server.
 */

const app = require('./app')
const database = require('./database')
const request = require('request')
database.sequelize.sync().then(function() {
  app.listen(8000)

})
