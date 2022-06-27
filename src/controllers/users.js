const response = require(`../helpers/standarResponse`)

exports.getAllUser = (req, res) =>{
    return response(res, `List All Users`)
}

exports.createListUsers = (req, res) =>{
    return response(res,`Create Users`)
}

exports.editListUsers = (req, res) =>{
    return response(res,`Edit All Users`)
}

exports.deleteListUsers = (req, res) =>{
    return response(res,`Delete Users`)
}