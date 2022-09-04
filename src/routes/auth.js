const auth = require('express').Router();
const {rulesUsers, rulesPin, rulesProfile, rulesPhoneNum, rulesChangePin, rulesChangePass, rulesTransaction} = require('./validator');
const validation = require('../middleware/validation');
const controlAuth = require('../controllers/auth');
const authorization = require('../middleware/auth');
const uploadPhoto = require('../middleware/upload');

//user register
auth.post('/register',...rulesUsers,validation,controlAuth.register);
auth.post('/createPin',...rulesPin,validation,controlAuth.createPin);
auth.post('/login',controlAuth.login);


//User was Login
auth.get('/profile',authorization,controlAuth.getProfile);
auth.get('/historyTransaction',authorization,controlAuth.historyTransaction);
auth.post('/number',authorization,...rulesPhoneNum,validation,controlAuth.insertPhoneNum);
auth.post('/transfer',authorization,controlAuth.transferToOthers);
auth.patch('/profile',authorization,uploadPhoto,...rulesProfile,validation,controlAuth.updateProfile);
auth.patch('/number',authorization,...rulesPhoneNum,validation,controlAuth.updateNumber);
auth.patch('/changePin',authorization,...rulesChangePin,validation,controlAuth.changePin);
auth.patch('/changePassword',authorization,...rulesChangePass,validation,controlAuth.changePass);
auth.patch('/topUp',authorization,controlAuth.topUpUsers);

module.exports = auth;