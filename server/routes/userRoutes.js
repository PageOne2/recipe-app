const express = require('express')

const userController = require('../controllers/userControllers')
const authController = require('../controllers/authController')

const router = express.Router()

router.get('/myRecipes', authController.protect, userController.getMyRecipes)

router.post('/signup', authController.signUp)
router.post('/login', authController.login)

router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword/:token', authController.resetPassword)

router.use(authController.protect)

router.get('/me', userController.getMe, userController.getUser)
router.patch('/updateMyPassword', authController.updatePassword)
router.patch('/updateMe', userController.updateUserPhoto, userController.resizeUserPhoto, userController.updateMe)

router
    .route('/user/:id')
    .get(userController.getUser)

router.use(authController.restrictTo('admin'))

router
    .route('/all-users')
    .get(authController.protect, userController.getAllUsers)


module.exports = router