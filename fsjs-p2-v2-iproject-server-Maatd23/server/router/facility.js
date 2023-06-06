const KosanController = require('../controller/kosanController')

const router =  require('express').Router()



router.use('/', KosanController.getFacility)


module.exports = router