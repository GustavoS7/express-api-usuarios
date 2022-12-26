const express = require("express")
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UserController = require('../controllers/UserController');

router.get('/', HomeController.index);
router.post('/user', UserController.create)
router.get('/user', UserController.index)
router.get('/user/:id', UserController.findUserById)
router.put('/user/:id', UserController.edit)
router.delete('/user/:id', UserController.remove)
router.post('/user/recoverpassword', UserController.recoverPassword)

module.exports = router;