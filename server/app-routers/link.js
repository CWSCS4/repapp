const express = require('express')
const db = require('../database')

const router = express.Router()

router.get('/', function (req, res) {
  res.json({success: true, data: {college:req.link.college,scheduledTime:req.link.scheduledTime,notesToCollege:req.link.notesToCollege,notesFromCollege:req.link.notesFromCollege,repname:req.link.repname}})
  })

module.exports = router