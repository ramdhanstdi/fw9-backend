const auth = require('express').Router();
const {rulesUsers, rulesPin, rulesProfile} = require('./validator');
const validation = require('../middleware/validation');
const controlAuth = require('../controllers/auth');
const authorization = require('../middleware/auth');
const uploadPhoto = require('../middleware/upload');

auth.post('/register',...rulesUsers,validation,controlAuth.register);
auth.post('/createPin',...rulesPin,validation,controlAuth.createPin);
auth.post('/login',controlAuth.login);


//User was Login
auth.get('/profile',authorization,controlAuth.getProfile);
auth.patch('/profile',authorization,uploadPhoto,...rulesProfile,validation,controlAuth.updateProfile);

module.exports = auth;