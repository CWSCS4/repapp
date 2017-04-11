const Admin = require('./models').admin
const password = require('password-hash-and-salt')

module.exports = (email, password, callback) => {
  Admin.findOne({
    where: {email}
  }).then(admin => {
    password(password).verifyAgainst(admin.passwordHash, (err, verified) => {
      if (err) callback(err, null)
      else {
        if (verified) callback(null, admin)
        else callback(new Error('Invalid password'), null)
      }
    })
  }).catch(err => callback(err, null))
}