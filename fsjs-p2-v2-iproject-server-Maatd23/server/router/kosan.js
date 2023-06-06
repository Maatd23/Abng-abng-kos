const KosanController = require('../controller/kosanController')
const { authentication } = require('../middleware/auth')

const router =  require('express').Router()

router.get('/', KosanController.getKosan)
router.get('/:id', KosanController.findOneKosan)
router.post('/',authentication, KosanController.addKosan)
router.post('/:KosanId',authentication, KosanController.addFacilityKosan)
router.delete('/:KosanId', authentication, KosanController.deleteFacilityKosan)

module.exports = router