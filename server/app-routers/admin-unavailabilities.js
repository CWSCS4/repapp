const express = require('express')
const db = require('../database')

const router = express.Router()

router.get('/:day', function (req, res){
	db.unavailable_day.findAll({
	    where:
	      {day:
	        {$gt: new Date(req.params.day),
	        $lt:  new Date((new Date(req.params.day)).getTime() + 7 * 24 * 60 * 60 * 1000)}
	      },
	    order: '"day" ASC',
	  	attributes: ['day','reason']
  	}).then( function ( unavailable_days ) {
	  	return [unavailable_days, db.unavailable_period.findAll({
		    where:
		      {$or:[
		        {day:
		        {$gt: new Date(req.params.day),
		        $lt:  new Date((new Date(req.params.day)).getTime() + 7 * 24 * 60 * 60 * 1000)}},
		        {repeatWeekly: true}]
		      },
		    order: '"day" ASC',
		    include:{model: db.period, attributes: ['day','period','start','end']},
		    attributes: ['day','reason','periodId','repeatWeekly']
	    })]
	  }
	).spread( function ( unavailable_days, unavailable_periods) {
		res.json({success : true, days : unavailable_days, periods : unavailable_periods})
	})
  .catch(function (err){
      res.json({success: false, message: err.message})
  })
})

module.exports = router
