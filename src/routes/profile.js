const profile = require('express').Router();
const profileControler = require('../controllers/profile');
const validation = require('../middleware/validation');
const {body} = require('express-validator');
const uploadPhoto = require('../middleware/upload');

const validator = [
  body('user_id').isInt().withMessage('Insert Only Number'),
  body('first_name').isLength({min:1}).withMessage('First Name should not Empty'),
  body('num_phone').isMobilePhone(['id-ID'])
];

profile.get('/',profileControler.getListProfile);
profile.post('/',uploadPhoto,...validator,validation,profileControler.createListProfile);
profile.patch('/:id',uploadPhoto,...validator,validation,profileControler.editListProfile);
profile.delete('/:id',profileControler.deleteListProfile);

module.exports = profile;