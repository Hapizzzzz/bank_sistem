const express = require('express')
const router = express.Router()
router.use ('/users', require('./user.routes'))
router.use ('/accounts', require('./account.routes'))
router.use ('/transactions', require('./transaction.routes'))

module.exports = router