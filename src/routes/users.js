const users = require('express').Router();
const {body} = require('express-validator');
const userController = require('../controllers/users');
const bcrypt = require('bcrypt');

const validatorCreate = [
  body('email')
    .isEmail().withMessage('Email Not Valid'),
  body('username')
    .isLength({min:5}).withMessage('Username should have min 5char'),
  body('pin')
    .isNumeric().withMessage('Input Only Number')
    .isLength({min:6, max:6}).withMessage('Pin should only 6 digit'),
  body('password')
    .isLength({min:8}).withMessage('Password should have Minimal 8 char')
    .customSanitizer(async (pass)=>{
      const hash = await bcrypt.hash(pass, 10);
      return hash;
    })
];

users.get('/', userController.getAllUser);
users.post('/', ...validatorCreate,userController.createListUsers);
users.patch('/:id',...validatorCreate,userController.editListUsers);
users.delete('/:id', userController.deleteListUsers);

module.exports = users;