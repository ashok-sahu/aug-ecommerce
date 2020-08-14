const express = require('express')
const router = express.Router()
const catagoryController = require('../controllers/catagoryController')

router.post('/catagory/create',catagoryController.createCatagory)

module.exports = router