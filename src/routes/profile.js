const profile = require('express').Router();
const profileControler = require('../controllers/profile');
const {rulesProfile}= require('./validator');
const validation = require('../middleware/validation');
const uploadPhoto = require('../middleware/upload');

profile.get('/:id',profileControler.getDetailProfile);
profile.get('/',profileControler.getListProfile);
profile.post('/',uploadPhoto,...rulesProfile,validation,profileControler.createListProfile);
profile.patch('/:id',uploadPhoto,...rulesProfile,validation,profileControler.editListProfile);
profile.delete('/:id',profileControler.deleteListProfile);

module.exports = profile;