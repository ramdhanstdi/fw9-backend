const profile = require('express').Router();
const {body} = require('express-validator');
const profileControler = require('../controllers/profile');

const validator = [body('user_id').isLength({min:1}).withMessage('User Id cant be empty')];


profile.get('/',profileControler.getListProfile);
profile.post('/',...validator,profileControler.createListProfile);
profile.patch('/:id',...validator,profileControler.editListProfile);
profile.delete('/:id',profileControler.deleteListProfile);

module.exports = profile;