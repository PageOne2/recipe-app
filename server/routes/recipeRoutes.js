const express = require('express')

const authController = require('../controllers/authController')
const recipeController = require('../controllers/recipeController')

const router = express.Router()

router
    .route('/')
    .get(recipeController.getAllRecipes)
    .post(authController.protect, authController.restrictTo('user'), recipeController.createRecipe)

router.get('/mostRecent/:page', recipeController.getMostRecent)
router.get('/mostLiked/:page', recipeController.getMostLiked)

router
    .route('/:id')
    .get(recipeController.getRecipe)
    .patch(authController.protect, authController.restrictTo('user'), recipeController.isUserRecipe('update'), recipeController.updateRecipe)
    .delete(authController.protect, recipeController.isUserRecipe('delete'), recipeController.deleteRecipe)    

module.exports = router