const Admin = require('../database').admin
const bodyParser = require('body-parser')
const passwordHash = require('password-hash-and-salt')
const validatePostParams = require('../validate-post-params')

function authenticate(email, password) {
  return new Promise((resolve, reject) => {
    Admin.findOne({
      where: {email}
    }).then(admin => {
      if (admin === null) throw new Error('No such user')
      passwordHash(password).verifyAgainst(admin.passwordHash, (err, verified) => {
        if (err) reject(err)
        else {
          if (verified) resolve(admin)
          else reject(new Error('Invalid password'))
        }
      })
    }).catch(reject)
  })
}

module.exports = app => {
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
      new Promise((resolve, reject) => {
        authenticate(email, password)
          .then(admin => {
            req.session.regenerate(err => {
              if (err) reject(err)
              else {
                req.session.admin = admin
                res.json({success: true})
              }
            })
          })
          .catch(reject)
      })
        .catch(err => res.json({success: false, message: err.message}))
    }
  )
  function restrictToLoggedIn(req, res, next) {
    if (req.session.admin) next()
    else res.json({success: false, message: 'Must be logged in'})
  }

  app.get(
    '/api/restricted',
    restrictToLoggedIn,
    (req, res) => res.json({success: true, response: "You're in!"})
  )
}