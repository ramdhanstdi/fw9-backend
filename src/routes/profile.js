const profile = require('express').Router();
const {body} = require('express-validator');
const profileControler = require('../controllers/profile');
const validatorCreate = [
  body('num_phone').isNumeric().withMessage('Number Not Valid')];


profile.get('/',profileControler.getListProfile);
profile.post('/',...validatorCreate,profileControler.createListProfile);
profile.patch('/:id',...validatorCreate,profileControler.editListProfile);
profile.delete('/:id',profileControler.deleteListProfile);

module.exports = profile;