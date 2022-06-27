const { listProfile } = require("../controllers/profile")

const profile = require(`express`).Router()

profile.get(`/`, listProfile)

module.exports = profile