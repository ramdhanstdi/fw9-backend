const auth = require('../middleware/auth');

const router = require('express').Router();

//Router Admin
router.use('/admin/users', require('./users'));
router.use('/admin/transaction', require('./transaction'));
router.use('/admin/profile', require('./profile'));
router.use('/admin/typeTransaction',require('./typeTransaction'));
router.use('/authentication',auth,(req,res)=>{
  const userModels = require('../models/users');
  userModels.getDetailUser(req.userAuth.id,(err,result)=>{
    const user = result.rows[0];
    return res.json({
      massages: 'Hallo'+user.username
    });
  });
});

//Router Users
router.use('/',require('./auth'));
router.use('/auth',require('./auth'));
module.exports = router;