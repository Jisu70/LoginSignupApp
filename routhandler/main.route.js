const express = require('express');

const router = express.Router();

const mainController = require('../controller/main.controller.js');
// Middleware 
// const checkLogin = require('../middleware/checkLogin.js')
// Main home route
router.get('/',mainController.mainRoute);

// To save the userdata
router.post('/savedata', mainController.saveData);

// If already have an account 
router.get('/existing-user',mainController.existinguser);

// login 
router.post('/login', mainController.loginUser);

module.exports = router;
