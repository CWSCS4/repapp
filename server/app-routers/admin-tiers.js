const express = require('express')
const db = require('../database')

const router = express.Router()

router.get('/', function (req, res){
  db.tier.findAll({attributes: ['priority','description']}).then(tiers => {
      res.json({success: true, tiers: tiers})
  }).catch(function (err){
    res.json({success: false, message: err.message})
  })
})

router.post('/', function (req, res){
	db.tier.create({
		priority:req.body.priority,
    description:req.body.description
	}).then ( tier => {
		res.json({success : true})
	}).catch(function (err){
      res.json({success: false, message: err.message})
  	})
})

router.delete('/:priority', function (req, res) {
  db.tier.destroy({where: {priority:req.params.priority} }).then(tier => {
      res.json({success: true})
  }).catch(function (err){
    res.json({success: false, message: err.message})
  })
})

module.exports = router
