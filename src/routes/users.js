const users = require('express').Router();
const validation = require('../middleware/validation');
const userController = require('../controllers/users');
const {rulesUsers} = require('./validator');

users.get('/:id',userController.getDetailUser);
users.get('/',userController.getAllUser);
users.post('/', ...rulesUsers,validation,userController.createListUsers);
users.patch('/:id',...rulesUsers,validation,userController.editListUsers);
users.delete('/:id', userController.deleteListUsers);

module.exports = users;