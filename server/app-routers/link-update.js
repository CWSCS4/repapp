const express = require('express')
const db = require('../database')

const router = express.Router()

router.post('/visit', function (req, res) {
  db.link.update({
    periodId:req.body.period,
    scheduledTime:req.body.day
  },{where: {uuid:req.link.uuid} }).then(link => {
      res.json({success: true})
  }).catch(function (err){
    res.json({success: false, message: err.message})
  })
})

router.delete('/visit', function (req, res) {
  db.link.destroy({where: {uuid:req.link.uuid} }).then(link => {
      res.json({success: true})
  }).catch(function (err){
    res.json({success: false, message: err.message})
  })
})

router.post('/notes', function (req, res) {
  db.link.update({notesFromCollege:req.body.notes,notesFromCollegeSeen:false},
    {where: {uuid:req.link.uuid} }).then(link => {
      res.json({success: true})
  }).catch(function (err){
    res.json({success: false, message: err.message})
  })
})

router.post('/repName', function (req, res) {
  db.link.update({repName:req.body.repName},
    {where: {uuid:req.link.uuid} }).then(link => {
      res.json({success: true})
  }).catch(function (err){
    res.json({success: false, message: err.message})
  })
})

router.get('/read-notes', function (req, res) {
  db.link.update({notesFromCollegeSeen: true},{where: {uuid:req.params.linkid} }).then(link => {
      res.json({success: true})
  }).catch(function (err){
    res.json({success: false, message: err.message})
  })
})


module.exports = router
