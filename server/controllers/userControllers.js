const User = require('../model/userModel')
const Recipe = require('../model/recipeModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const multer = require('multer')
const sharp = require('sharp')

/*const multerStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'dev-data/img/user-imgs')
    },
    filename: (req, file, callback) => {
        const extension = file.mimetype.split('/')[1]
        callback(null, `user-${req.user.id}-${Date.now()}.${extension}`)
    }
})*/

const multerStorage = multer.memoryStorage()

const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true)
  } else {
    callback(new AppError('This file is not an image! Only image uploads allowed.'), false)
  }
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
})

exports.uploadUserPhoto = upload.single('photo')

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next()

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/user/${req.file.filename}`)

  next()
})

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find()

  res.status(200).json({
    status: 'success',
    data: {
      users
    }
  })
})

exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id)

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })
})

exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id

  next()
})

const filterBody = (body, ...allowedFields) => {
  const newBody = {}
  Object.keys(body).forEach(field => {
    if (allowedFields.includes(field)) newBody[field] = body[field]
  })

  return newBody
}

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password updates! Please use /updateMyPassword'))
  }

  const filteredBody = filterBody(req.body, 'name', 'email')
  if (req.file) filteredBody.photo = req.file.filename

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    status: 'success',
    data: {
      updatedUser
    }
  })
})

exports.getMyRecipes = catchAsync(async (req, res, next) => {
  const query = Recipe.where('user').equals(req.user.id)
  const myRecipes = await query

  if (!myRecipes) return next(new AppError("You don't have recipes yet!"))

  res.status(200).json({
    status: 'success',
    length: myRecipes.length,
    data: {
      myRecipes
    }
  })
})

exports.likeRecipe = catchAsync( async (req, res, next) => {
  const likes = await Recipe.findByIdAndUpdate({ _id: req.params.id}, { $inc: { 'likes' : 1 }}, { new: true, select: 'likes' });
  await User.findByIdAndUpdate(req.user.id, { $push: { 'likedRecipes': req.params.id } });

  res.status(200).json({
    status: 'success',
    likes: likes.likes
  })
})

exports.dislikeRecipe = catchAsync( async (req, res, next) => {
  const likes = await Recipe.findByIdAndUpdate({ _id: req.params.id }, { $inc: { 'likes': -1 }}, { new: true, select: 'likes' });
  await User.findByIdAndUpdate({ _id: req.user.id }, { $pull: { 'likedRecipes': req.params.id } });

  res.status(200).json({
    status: 'success',
    likes: likes.likes
  })
})

