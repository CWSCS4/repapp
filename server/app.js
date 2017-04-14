const crypto = require('crypto')
const express = require('express')
const session = require('express-session')

const apiRouter = require('./app-routers/api')

const app = express()

app.use(session({
  secret: crypto.randomBytes(64).toString('hex'),
  resave: false,
  saveUninitialized: false
}))

app.use('/api', apiRouter)

// This address is relative to where the node process is started.
app.use(express.static('public'))

module.exports = app