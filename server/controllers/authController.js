const User = require("../model/userModel")
const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const crypto = require('crypto')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const sendEmail = require('../utils/email')

// Create token using user's id as payload
const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

// Give the user generated token 
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id)

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if(process.env.NODE_ENV === 'production') cookieOptions.secure = true

    res.cookie('jwt', token, cookieOptions)

    user.password = undefined

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}

// Creating a user account if email is not already in use
exports.signUp = catchAsync( async (req, res) => {  
    const user = await User.findOne({ email: req.body.email })
    if(user) {
        res.status(400).json({
            status: 'fail',
            message: 'Email already in use!'
        })
    } else {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        })

        createSendToken(newUser, 201, res)
    }
})

// Logging user in
exports.login = catchAsync( async (req, res, next) => {
    const { email, password } = req.body

    if(!email || !password) {
        return next(new AppError('Please provide a valid email or password!', 400))
    }

    const user = await User.findOne({ email }).select('+password')

    if(!user || !(await user.correctPassword(password, user.password))){
        return next(new AppError('Incorrect email or password!', 401))
    }

    createSendToken(user, 200, res)
})

// Checking if client has a token (a valid one) required to access routes for logged users only 
exports.protect = catchAsync( async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token) {
        return next(new AppError('You are not logged in! Log in again to get access.', 401))
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    const currentUser = await User.findById(decoded.id)

    if(!currentUser) {
        return next(new AppError('The user belonging to this token no longer exist!', 401))
    }

    if(currentUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('User changed password recently! Please log in again.'))
    }

    req.user = currentUser

    next()
})

// Checking if user accessing restricted routes is a admin
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action!', 403))
        }

        next()
    }
}

// Sending a url along with token to the user email address
exports.forgotPassword = catchAsync( async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if(!user) return next(new AppError('There is no user with this email address', 404))

    const resetToken = user.createPasswordResetToken()
    await user.save({ validateBeforeSave: false })

    const resetURL = `${req.protocol}://${req.get('host')}/api/resetToken/${resetToken}`

    const message = `Forgot your password ? Submit a PATCH request with password and passwordConfirm to ${resetURL}.\nIf didn't forgot your
    password, please ignore this message.`

    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password reset token! Valid for 10 minutes.',
            message
        })

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email'
        })

    } catch(err) {
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        await user.save({ validateBeforeSave: false })

        return next(new AppError('There was a error sending email! Try again later.', 500))
    }
})

// Controller to handle the URl that was sent to user email
exports.resetPassword = catchAsync( async(req, res, next) => {
    // Geting the token from the URL and generating a new one that will be compared with the one in the database
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    })

    if(!user) {
        return next(new AppError('Token is invalid or has expired!', 400))
    }

    // If tokens comparisons were successful it means that the user has access to the email he provided, now he can change his password
    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined

    await user.save()

    createSendToken(user, 200, res)
})

exports.updatePassword = catchAsync( async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')

    if(!(await user.correctPassword(req.body.currentPassword, user.password))) {
        return next(new AppError('Your current password is wrong!', 401))
    }

    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    await user.save()

    createSendToken(user, 200, res)
})
