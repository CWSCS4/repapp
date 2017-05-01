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

module.exports = router
