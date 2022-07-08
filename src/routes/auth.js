const auth = require('express').Router();
const {rulesUsers, rulesPin} = require('./validator');
const validation = require('../middleware/validation');
const controlAuth = require('../controllers/auth');

auth.post('/register',...rulesUsers,validation,controlAuth.register);
auth.post('/createPin',...rulesPin,validation,controlAuth.createPin);
auth.post('/login',controlAuth.login);

module.exports = auth;