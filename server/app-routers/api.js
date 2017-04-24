const express = require('express')
const restrictToLoggedIn = require('../restrict-to-logged-in')
const bodyParser = require('body-parser')
const loginRouter = require('./login')
const db = require('../database')
const router = express.Router()
router.use('/login', loginRouter)
router.get(
  '/restricted',
  restrictToLoggedIn,
  (req, res) => res.json({success: true, response: "You're in!"})
)

// This address is relative to where the node process is started.
router.use(express.static('public'))

router.use(bodyParser.json())

router.get('/links/all', function (req, res) {
  db.link.findAll({attributes: ['college','uuid','scheduledTime','notesFromCollege','notesFromCollegeSeen','lastSignedIn']}).then(links => {
      res.json({success: true, data: links})
  }).catch(function (err){
    res.json({success: false, message: err.message})
  })
})

router.get('/link/:linkid', function (req, res) {
  db.link.findOne({where: {uuid:req.params.linkid} }).then(link => {
      res.json({success: true, data: link})
  }).catch(function (err){
    res.json({success: false, message: err.message})
  })
})

router.post('/link', function (req, res) {
  db.link.create({
  	college: req.body.collegeName,
  	repName: req.body.repName,
  	tierPriority: req.body.tierPriority,
  	notesToCollege: req.body.toCollege
  }).then(linkObject => {
    res.json({success: true, uuid: linkObject.uuid})
  }).catch(function (err){
    res.json({success: false, message: err.message})
  })
})

router.delete('/link/:linkid', function (req, res) {
  db.link.destroy({where: {uuid:req.params.linkid} }).then(link => {
      res.json({success: true})
  }).catch(function (err){
    res.json({success: false, message: err.message})
  })
})

router.get('/links/upcoming', function (req, res) {
  db.link.findAll({
  	attributes: ['college','scheduledTime'],
  	where: {
      scheduledTime:{$ne:null}
    },
    order: '"scheduledTime" ASC'}).then(links => {
      res.json({success: true, visits: links.filter(function (link){
        return (new Date(link.scheduledTime[0]) > new Date())
      })})
  }).catch(function (err){
    res.json({success: false, message: err.message})
  })
})


/*router.get('/temp/:linkid', function (req, res) {
  db.link.update({scheduledTime: ["2017-04-23 15:52:10.458000", "2017-04-23 15:54:10.458000"]},{where: {uuid:req.params.linkid} }).then(link => {
      res.json({success: true})
  }).catch(function (err){
    res.json({success: false, message: err.message})
  })
})*/

module.exports = router
