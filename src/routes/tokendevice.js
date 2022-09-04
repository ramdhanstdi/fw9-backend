const token = require('express').Router();
const tokenController = require('../controllers/tokendevice');

token.get('/token/:userid',tokenController.getToken);
token.get('/checkToken/:token',tokenController.checkToken);
token.post('/token',tokenController.saveToken);
token.patch('/token/:token',tokenController.editToken);
token.delete('/token',tokenController.deleteToken);

module.exports = token;