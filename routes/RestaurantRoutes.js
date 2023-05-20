'use strict'
const RestaurantValidation = require('../controllers/validation/RestaurantValidation')
const RestaurantController = require('../controllers/RestaurantController')
const OrderController = require('../controllers/OrderController')
const ProductController = require('../controllers/ProductController')
const multer = require('multer')
const fs = require('fs')
const Restaurant = require('../models').Restaurant

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdirSync(process.env.RESTAURANTS_FOLDER, { recursive: true })
    cb(null, process.env.RESTAURANTS_FOLDER)
  },
  filename: function (req, file, cb) {
    cb(null, Math.random().toString(36).substring(7) + '-' + Date.now() + '.' + file.originalname.split('.').pop())
  }
})

const upload = multer({ storage }).fields([
  { name: 'logo', maxCount: 1 },
  { name: 'heroImage', maxCount: 1 }
])

module.exports = (options) => {
  const app = options.app

  // TODO: Include routes for restaurant described in the lab session wiki page.

  app.route('/restaurants') //the endpoint path
    .get( //the http verb that we want to be available at the previous path
      RestaurantController.index) // the function that will attend requests for that http verb and that path
    .post( //we can chain more http verbs for the same endpoint
      RestaurantController.create) // the function that will attend requests for that http verb and that path

  app.route('/restaurants/:restaurantId') //the endpoint path
    .get( //the http verb that we want to be available at the previous path
      RestaurantController.show) // the function that will attend requests for that http verb and that path
    .put( //the http verb that we want to be available at the previous path
      RestaurantController.update)
    .delete( //the http verb that we want to be available at the previous path
      RestaurantController.destroy)
    
}

