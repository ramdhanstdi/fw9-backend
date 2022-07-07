const response = require('../helpers/standarResponse');
const {validationResult} = require('express-validator');

const validation = (req,res,next) => {
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res, 'Error Accured',null ,validation.array(), 400);
  }
  next();
};

module.exports = validation;