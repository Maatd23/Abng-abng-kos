const UserController = require("../controller/userController");

const router = require("express").Router();

router.post('/login', UserController.login)
router.post('/registers/costumer', UserController.register)
router.post('/registers/owner', UserController.registerOwner)
router.post('/google-sign-in', UserController.google)


module.exports = router