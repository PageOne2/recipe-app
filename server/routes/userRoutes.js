const express = require('express')

const userController = require('../controllers/userControllers')
const authController = require('../controllers/authController')

const router = express.Router()


router.post('/signup', authController.signUp)
router.post('/login', authController.login)

router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword/:token', authController.resetPassword)
router.get('/userProfilePic/:key', userController.getUserProfilePic)
router
    .route('/user/:id')
    .get(userController.getUser)

router
    .route('/user/userRecipes/:id')
    .get(userController.getUserRecipes)

router
    .route('/user/recipesUserLiked/:id')
    .get(userController.getRecipesUserLiked)

router.use(authController.protect)

router.get('/me', userController.getMe, userController.getUser)
router.patch('/updateMyPassword', authController.updatePassword)
router.patch('/updateMe', userController.uploadUserPhoto, userController.resizeUserPhoto, userController.updateMe)
router.patch('/likeRecipe/:id', userController.likeRecipe)
router.patch('/dislikeRecipe/:id', userController.dislikeRecipe)
router.get('/myRecipes', userController.getUserRecipes)


router
    .route('/updateMyProfilePic/:id')
    .patch(userController.uploadUserPhoto, userController.resizeUserPhoto, userController.updateProfilePic)

router.use(authController.restrictTo('admin'))

router
    .route('/all-users')
    .get(authController.protect, userController.getAllUsers)


module.exports = router