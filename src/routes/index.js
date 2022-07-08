const router = require('express').Router();

//Router Admin
router.use('/admin/users', require('./users'));
router.use('/admin/transaction', require('./transaction'));
router.use('/admin/profile', require('./profile'));
router.use('/admin/typeTransaction',require('./typeTransaction'));

//Router Users
router.use('/auth', require('./auth'));
module.exports = router;