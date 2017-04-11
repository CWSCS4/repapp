const authenticate = require('./authenticate')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const express = require('express')
const session = require('express-session')

const app = express()

function validatePostParams(params) {
  return (req, res, next) => {
    const {body} = req
    let valid = true
    for (const param in params) {
      const value = body[param]
      const valueExists = !(value === null || value === undefined)
      if (!(valueExists && value.constructor === params[param])) {
        valid = false
        break
      }
    }
    if (valid) next()
    else res.json({success: false, message: 'Invalid parameters'})
  }
}

app.use(session({
  secret: crypto.randomBytes(64).toString('hex'),
  resave: false,
  saveUninitialized: false
}))

app.post(
  '/api/login',
  bodyParser.json(),
  validatePostParams({
    email: String,
    password: String
  }),
  (req, res) => {
    const {body} = req
    const {email, password} = body
    authenticate(email, password, (err, admin) => {
      if (err) res.json({success: false, message: err.message})
      else {
        req.session.regenerate(() => {
          req.session.admin = admin
          res.json({success: true})
        })
      }
    })
  }
)

// This address is relative to where the node process is started.
app.use(express.static('public'))

module.exports = app