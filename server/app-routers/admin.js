const express = require('express')
const adminLinksRouter = require('./admin-links')
const adminSettingsRouter = require('./admin-settings')
const adminUnavailabilitiesRouter = require('./admin-unavailabilities')

const router = express.Router()
router.use('/link', adminLinksRouter)
router.use(adminSettingsRouter)
router.use('/unavailabilities',adminUnavailabilitiesRouter)

module.exports = router
