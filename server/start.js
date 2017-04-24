#!/usr/bin/env node
/* start.js syncs the database then
 * starts the server.
 */

const app = require('./app')
const database = require('./database')
const request = require('request')

database.sequelize.sync().then(function() {
  app.listen(8000)

  /*request.post(
    'http://localhost:8000/api/link',
    { json: {collegeName:"Northwestern", repName:"Unknown", tierPriority:1, toCollege:"Hello!"} },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
        else {console.log(error)}
    }
)*/
})



//database.tier.create({priority:1,description:"Temp"})

//request.delete('http://localhost:8000/api/link/b9d64482-9350-4565-8f70-0ab62d6d918a')
