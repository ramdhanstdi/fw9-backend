const upload = require('../helpers/upload').single('photo');
const response = require('../helpers/standarResponse');

const uploadPhoto = (req,res,next)=>{
  upload(req,res,(err)=>{
    if(err){
      console.log(err);
      return response(res,'Failed Upload', null,null,400);
    }
    next();
  });
};

module.exports = uploadPhoto;