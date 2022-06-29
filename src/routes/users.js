const users = require('express').Router();

const userController = require('../controllers/users');

users.get('/', userController.getAllUser);
users.post('/', userController.createListUsers);
users.patch('/:id', userController.editListUsers);
users.delete('/:id', userController.deleteListUsers);

module.exports = users;