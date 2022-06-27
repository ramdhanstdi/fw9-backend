const response = require(`../helpers/standarResponse`)

exports.getListProfile = (req, res) =>{
    return response(res,`List All Profile`)
}

exports.createListProfile = (req, res) =>{
    return response(res,`Create Profile`)
}

exports.editListProfile = (req, res) =>{
    return response(res,`Edit All Profile`)
}

exports.deleteListProfile = (req, res) =>{
    return response(res,`Delete Profile`)
}