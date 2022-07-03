const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/transaction', require('./transaction'));
router.use('/profile', require('./profile'));
router.use('/typeTransaction',require('./typeTransaction'));

module.exports = router;