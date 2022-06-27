const transaction = require(`express`).Router()

const transactionController = require("../controllers/transaction")

transaction.get(`/`,transactionController.getListTransaction)
transaction.post(`/`,transactionController.createListTransaction)
transaction.patch(`/`,transactionController.editListTransaction)
transaction.delete(`/`,transactionController.deleteListTransaction)

module.exports = transaction