const express = require('express')
const db = require('../database')
const respondWithError = require('../respond-with-error')
const router = express.Router()

router.get('/:day', function (req, res) {
	const date = new Date(req.params.day)
	const nextWeek = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000)
	Promise.all([
		db.unavailable_day.findAll({
			where:
			{
				day:
				{
					$gte: date,
					$lt: nextWeek
				}
			},
			order: '"day" ASC',
			attributes: ['day', 'reason']
		}),
		db.unavailable_period.findAll({
			where:
			{
				$or: [
					{
						day:
						{
							$gte: date,
							$lt: nextWeek
						}
					},
					{
						$and:
						{
							repeatWeekly: true,
							$or: [
								{
									repeatEnd:
									{
										$gte: date
									}
								},
								{ repeatEnd: null }
							]
						}
					}]
			},
			order: '"day" ASC',
			include: { model: db.period, attributes: ['day', 'period', 'start', 'end'] },
			attributes: ['day', 'reason', 'periodId', 'repeatWeekly', 'repeatEnd']
		})
	]).then(function ([days, periods]) {
		res.json({ success: true, days, periods })
	})
		.catch(respondWithError(res))
})

//[start,end) -- exclusive upper bound
router.post('/day', function (req, res) {
	let day = new Date(req.body.start)
	const end = new Date(req.body.end)
	const dateArray = []
	while (day <= end){
		dateArray.push(day)
		day=new Date(day.getTime() + 24 * 60 * 60 * 1000)
	}
	Promise.all(dateArray.map( function (day) {
		db.unavailable_day.create({
			day,
			tierPriority: req.body.tier,
			reason: req.body.reason
		})
	})).then(() => res.json({ success: true }))
	.catch(respondWithError(res))
})

router.post('/period', function (req, res) {
	db.unavailable_period.create({
		repeatWeekly: req.body.repeatWeekly,
		repeatEnd: req.body.repeatEnd,
		periodId: req.body.period,
		day: req.body.day,
		tierPriority: req.body.tier,
		reason: req.body.reason
	})
		.then(() => res.json({ success: true }))
		.catch(respondWithError(res))
})

module.exports = router
