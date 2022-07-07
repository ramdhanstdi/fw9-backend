const profile = require('express').Router();
const profileControler = require('../controllers/profile');
const validation = require('../middleware/validation');
const {body} = require('express-validator');
const uploadPhoto = require('../middleware/upload');

const validator = [
  body('user_id').optional({ checkFalsy: true }).escape().isInt().withMessage('Insert Only Number'),
  body('first_name').optional({ checkFalsy: true }).escape().isLength({min:1}).withMessage('First Name should not Empty'),
  body('num_phone').optional({ checkFalsy: true }).escape().isMobilePhone(['id-ID']),
  body('last_name').optional({ checkFalsy: true }).escape(),
  body('balance').optional({ checkFalsy: true }).escape()
];

profile.get('/:id',profileControler.getDetailProfile);
profile.get('/',profileControler.getListProfile);
profile.post('/',uploadPhoto,...validator,validation,profileControler.createListProfile);
profile.patch('/:id',uploadPhoto,...validator,validation,profileControler.editListProfile);
profile.delete('/:id',profileControler.deleteListProfile);

module.exports = profile;