const profile = require('express').Router();

const profileControler = require('../controllers/profile');

profile.get('/',profileControler.getListProfile);
profile.post('/',profileControler.createListProfile);
profile.patch('/:id',profileControler.editListProfile);
profile.delete('/:id',profileControler.deleteListProfile);

module.exports = profile;