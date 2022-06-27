const profile = require(`express`).Router()

const profileControler = require("../controllers/profile")

profile.get(`/`,profileControler.getListProfile)
profile.post(`/`,profileControler.createListProfile)
profile.patch(`/`,profileControler.editListProfile)
profile.delete(`/`,profileControler.deleteListProfile)

module.exports = profile