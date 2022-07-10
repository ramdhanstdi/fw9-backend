const bcrypt = require('bcrypt');
const {body} = require('express-validator');


exports.rulesUsers = [
  body('email')
    .isEmail().withMessage('Email Not Valid'),
  body('username')
    .isLength({min:5}).withMessage('Username should have min 5char')
    .trim().escape(),
  body('password')
    .isLength({min:8}).withMessage('Password should have Minimal 8 char')
    .customSanitizer(async (pass)=>{
      const hash = await bcrypt.hash(pass, 10);
      return hash;
    })
];

exports.rulesProfile = [
  body('first_name').optional({ checkFalsy: true }).escape().isLength({min:1}).withMessage('First Name should not Empty'),
  body('last_name').optional({ checkFalsy: true }).escape(),
];

exports.rulesTransaction = [
  body('receiver').isLength({min:1}).withMessage('Receiver can\'t be empty'),
  body('amount').isInt({min:1}).withMessage('Input only positive number')
    .isLength({min:1}).withMessage('Amount can\'t be empty'),
  body('time').isISO8601().withMessage('Time Transfer in Valid')
];

exports.rulesTypeTransaction = [
  body('name').isLength({min:1}).withMessage('Name cant be Empty'),
  body('description').optional({ checkFalsy: true }).escape()
];

exports.rulesPin = [
  body('pin')
    .isNumeric().withMessage('Input Only Number')
    .isLength({min:6, max:6}).withMessage('Pin should only 6 digit'),
  body('email')
    .isEmail().withMessage('Email Not Valid')];

exports.rulesPhoneNum = [
  body('num_phone').isMobilePhone(['id-ID'])
];

exports.rulesChangePin = [
  body('oldPin')
    .isNumeric().withMessage('Input Only Number')
    .isLength({min:6, max:6}).withMessage('Pin should only 6 digit'),
  body('newPin')
    .isNumeric().withMessage('Input Only Number')
    .isLength({min:6, max:6}).withMessage('Pin should only 6 digit')
];

exports.rulesChangePass = [
  body('newPass')
    .isLength({min:8}).withMessage('Password should have Minimal 8 char'),
  body('confirmPass')
    .isLength({min:8}).withMessage('Password should have Minimal 8 char')
];