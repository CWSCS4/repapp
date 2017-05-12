const express = require('express')
const db = require('../database')

const router = express.Router()

router.get('/:day', function (req, res){
	db.unavailable_day.findAll({
	    where:
	      {day:
	        {$gte: new Date(req.params.day),
	        $lt:  new Date((new Date(req.params.day)).getTime() + 7 * 24 * 60 * 60 * 1000)}
	      },
	    order: '"day" ASC',
	  	attributes: ['day','reason']
  	}).then( function ( unavailable_days ) {
	  	return [unavailable_days, db.unavailable_period.findAll({
		    where:
		      {$or:[
		        {day:
		        {$gte: new Date(req.params.day),
		        $lt:  new Date((new Date(req.params.day)).getTime() + 7 * 24 * 60 * 60 * 1000)}},
		        {$and:
	              {repeatWeekly: true,
	                $or:[
	                  {repeatEnd:
	                    {
	                      $gte:new Date(req.params.day)
	                    }
	                  },
	                  {repeatEnd:null}
	                ]
	              }
	            }]
		      },
		    order: '"day" ASC',
		    include:{model: db.period, attributes: ['day','period','start','end']},
		    attributes: ['day','reason','periodId','repeatWeekly','repeatEnd']
	    })]
	  }
	).spread( function ( unavailable_days, unavailable_periods) {
		res.json({success : true, days : unavailable_days, periods : unavailable_periods})
	})
  .catch(function (err){
      res.json({success: false, message: err.message})
  })
})

router.post('/day', function (req, res){
		req.body.day.forEach( function (day) {
			db.unavailable_days.create({
				day:day,
				tierPriority:req.body.tier,
				reason:req.body.reason
			}).catch(function (err){
		      res.json({success: false, message: err.message})
			})
		})
		res.json({success: true})
})

router.post('/period', function (req, res){
	db.unavailable_periods.create({
		repeatWeekly:req.body.repeatWeekly,
		repeatEnd: req.body.repeatEnd,
		periodId: req.body.period,
		day:req.body.day,
		tierPriority:req.body.tier,
		reason:req.body.reason
	}).then ( function ( unavailable_period ) {
		res.json({success : true})
	}).catch(function (err){
      res.json({success: false, message: err.message})
  	})
})

module.exports = router
