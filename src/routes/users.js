const { listUser } = require("../controllers/users")

const users = require(`express`).Router()

users.get(`/`, listUser)

module.exports = users