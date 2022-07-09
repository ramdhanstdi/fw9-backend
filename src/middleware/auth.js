const jwt = require('jsonwebtoken');
const response = require('../helpers/standarResponse');


const auth  = (req,res,next)=>{
  if(req.headers.authorization){
    const auth = req.headers.authorization;
    const prefix = 'Bearer';
    if(auth.startsWith(prefix)){
      const token = auth.slice(prefix.length+1,auth.length);
      try{
        const result = jwt.verify(token,process.env.APP_KEY||'secretKey');
        req.userAuth=result;
        next();
      }catch(e){
        return response(res,'Token Expired', null, null, 401);
      }
    }
  }else{
    return response(res,'Token Expired', null, null, 401);
  }
};

module.exports = auth;