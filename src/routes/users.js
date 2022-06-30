const users = require('express').Router();
const {body} = require('express-validator');
const userController = require('../controllers/users');

const validatorCreate = [
  body('email').isEmail().withMessage('Email Not Valid'),
  body('password').isLength({min:8}).withMessage('Minimal 8 char')
  // .isAlphanumeric().withMessage('Should input Number')
  // .isUppercase({min:1}).withMessage('Should have Uppercase')
  // .isLowercase({min:1}).withMessage('Should have Lowercase')
];


users.get('/', userController.getAllUser);
users.post('/', ...validatorCreate,userController.createListUsers);
users.patch('/:id',...validatorCreate,userController.editListUsers);
users.delete('/:id', userController.deleteListUsers);

module.exports = users;