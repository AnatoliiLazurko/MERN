const express = require('express');

const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');
const { userVerification } = require('../Middlewares/AuthMiddleware');

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/signup', AuthController.signUp);

router.get('/user-info', userVerification, AuthController.info);

router.get('/users', UserController.getUsers);

module.exports = router;