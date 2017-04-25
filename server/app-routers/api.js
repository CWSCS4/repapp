const express = require('express')
const restrictToLoggedIn = require('../restrict-to-logged-in')
const bodyParser = require('body-parser')
const loginRouter = require('./login')
const db = require('../database')
const adminRouter = require('./admin')
const collegeRepRouter = require('./college-rep')

const router = express.Router()
router.use(bodyParser.json())

router.use('/login', loginRouter)
//router.use('/admin', restrictToLoggedIn, adminRouter)
router.use('/admin', adminRouter)

// API calls college reps need
router.use('/:linkId', (req, res, next) => {
  req.linkId = req.params.linkId
  next()
},
collegeRepRouter)

// This address is relative to where the node process is started.
router.use(express.static('public'))


router.use(bodyParser.json())


/*router.get('/temp/:linkid', function (req, res) {
  db.link.update({scheduledTime: ["2017-04-23 15:52:10.458000", "2017-04-23 15:54:10.458000"]},{where: {uuid:req.params.linkid} }).then(link => {
      res.json({success: true})
  }).catch(function (err){
    res.json({success: false, message: err.message})
  })
})*/

module.exports = router
