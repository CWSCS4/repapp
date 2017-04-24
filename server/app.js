const crypto = require('crypto')
const {sequelize} = require('./database')
const express = require('express')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const apiRouter = require('./app-routers/api')

const app = express()
const restrictToLoggedIn = require('./restrict-to-logged-in')

app.use(session({
  secret: crypto.randomBytes(64).toString('hex'),
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({db: sequelize})
}))

app.use('/api', apiRouter)



module.exports = app
