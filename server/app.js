const express = require('express')
const app = express()
const db = require('./database')
//const restrictToLoggedIn = require('./restrict-to-logged-in')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')

// This address is relative to where the node process is started.
app.use(express.static('public'))

app.use(bodyParser.json())

app.get('/api/links', function (req, res) {
  db.link.findAll({attributes: ['college','uuid','scheduledTime','notesFromCollege','notesFromCollegeSeen','lastSignedIn']}).then(links => {
      res.json({success: true, data: links})
  }).catch(function (err){
    res.json({success: false, message: err.message})
  })
})

app.get('/api/link/:linkid', function (req, res) {
  db.link.findOne({where: {uuid:req.params.linkid} }).then(link => {
      res.json({success: true, data: link})
  }).catch(function (err){
    res.json({success: false, message: err.message})
  })
})

app.post('/api/link', function (req, res) {
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

app.delete('/api/link/:linkid', function (req, res) {
  db.link.destroy({where: {uuid:req.params.linkid} }).then(link => {
      res.json({success: true})
  }).catch(function (err){
    res.json({success: false, message: err.message})
  })
})

app.get('/api/read-notes/:linkid', function (req, res) {
  db.link.update({notesFromCollegeSeen: true},{where: {uuid:req.params.linkid} }).then(link => {
      res.json({success: true})
  }).catch(function (err){
    res.json({success: false, message: err.message})
  })
})

//Assumes all completed visits have been deleted.
app.get('/api/upcoming', function (req, res) {
  db.link.findAll({
  	attributes: ['college','scheduledTime'],
  	where: {scheduledTime:{$ne:null}},
    limit: 10,
    order: '"scheduledTime" ASC'}).then(links => {
      res.json({success: true, visits: links})
  }).catch(function (err){
    res.json({success: false, message: err.message})
  })
})


/*app.get('/api/temp/:linkid', function (req, res) {
  db.link.update({scheduledTime: ["2017-05-16 15:58:10.458000", "2017-05-17 15:54:10.458000"]},{where: {uuid:req.params.linkid} }).then(link => {
      res.json({success: true})
  }).catch(function (err){
    res.json({success: false, message: err.message})
  })
})*/

app.get('/api/periods', function (req, res) {
	db.period.findAll({attributes:['day','period','start','end']}).then(periods => {
		res.json({success:true, data:periods})
	}).catch(function (err){
    res.json({success: false, message: err.message})
  })
})

module.exports = app
