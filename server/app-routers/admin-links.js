const express = require('express')
const db = require('../database')

const router = express.Router()

router.get('/all', function (req, res) {
  db.link.findAll({attributes: ['college','uuid','scheduledTime','periodID','notesFromCollege','notesFromCollegeSeen','lastSignedIn']}).then(links => {
      res.json({success: true, data: links})
  }).catch(function (err){
    res.json({success: false, message: err.message})
  })
})

router.post('/', function (req, res) {
  db.link.create({
  	college: req.body.collegeName,
  	repName: req.body.repName,
  	tierPriority: req.body.tierPriority,
  	notesToCollege: req.body.toCollege,
    notesFromCollegeSeen: true
  }).then(linkObject => {
    res.json({success: true, uuid: linkObject.uuid})
  }).catch(function (err){
    res.json({success: false, message: err.message})
  })
})

router.delete('/:linkid', function (req, res) {
  db.link.destroy({where: {uuid:req.params.linkid} }).then(link => {
      res.json({success: true})
  }).catch(function (err){
    res.json({success: false, message: err.message})
  })
})

router.get('/upcoming', function (req, res) {
  db.link.findAll({
  	attributes: ['college','scheduledTime','periodID'],
  	where: {
      scheduledTime:{
        $ne:null,
        $gt:new Date()
      }
    },
    order: '"scheduledTime" ASC'}).then(links => {
      res.json({success: true, visits:links})
  }).catch(function (err){
    res.json({success: false, message: err.message})
  })
})

module.exports = router
