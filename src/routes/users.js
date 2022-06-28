const users = require('express').Router();

const userController = require('../controllers/users');

users.get('/', userController.getAllUser);
users.post('/', userController.createListUsers);
users.patch('/', userController.editListUsers);
users.delete('/', userController.deleteListUsers);

module.exports = users;