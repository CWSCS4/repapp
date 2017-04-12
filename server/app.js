const crypto = require('crypto')
const express = require('express')
const fs = require('fs')
const path = require('path')
const session = require('express-session')

const app = express()

app.use(session({
  secret: crypto.randomBytes(64).toString('hex'),
  resave: false,
  saveUninitialized: false
}))

const ROUTERS_PATH = path.join(__dirname, 'app-routers')
const routers = fs.readdirSync(ROUTERS_PATH)
for (const routerFile of routers) {
  const router = require(path.join(ROUTERS_PATH, routerFile))
  router(app)
}

// This address is relative to where the node process is started.
app.use(express.static('public'))

module.exports = app