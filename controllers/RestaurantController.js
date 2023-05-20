'use strict'
const models = require('../models')
const Restaurant = models.Restaurant
const Product = models.Product
const RestaurantCategory = models.RestaurantCategory
const ProductCategory = models.ProductCategory

//TODO: Complete the following functions
exports.index = async function (req, res) {
    try {
        const restaurants = await Restaurant.findAll()
        res.json(restaurants)
      } catch (err) {
        res.status(500).send(err)
      }
}

exports.indexOwner = async function (req, res) {
    try {
        const restaurants = await Restaurant.findAll({
          where: {
            restaurantId: req.params.ownerId
          }
        })
        res.json(restaurants)
      } catch (err) {
        res.status(500).send(err)
      }
}

exports.create = async function (req, res) {
    let newRestaurant = Restaurant.build(req.body)
    try {
      newRestaurant = await newRestaurant.save()
      res.json(newRestaurant)
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.show = async function (req, res) {
    try {
        const restaurant = await Restaurant.findByPk(req.params.restaurantId, {
          include: [
          {
            model: RestaurantCategory,
            as: 'restaurantCategory'
          }]
        }
        )
        res.json(restaurant)
      } catch (err) {
        res.status(500).send(err)
      }
}

exports.update = async function (req, res) {
      try {
        await Restaurant.update(req.body, { where: { id: req.params.restaurantId } })
        const updatedRestaurant = await Restaurant.findByPk(req.params.restaurantId)
        res.json(updatedRestaurant)
      } catch (err) {
        res.status(500).send(err)
      }
}

exports.destroy = async function (req, res) {
    try {
        const result = await Restaurant.destroy({ where: { id: req.params.restaurantId } })
        let message = ''
        if (result === 1) {
          message = 'Sucessfuly deleted restaurant id.' + req.params.restaurantId
        } else {
          message = 'Could not delete restaurant.'
        }
        res.json(message)
      } catch (err) {
        res.status(500).send(err)
      }
}
