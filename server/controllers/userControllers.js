const User = require('../model/userModel')
const Recipe = require('../model/recipeModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const multer = require('multer')
const sharp = require('sharp')
const awsS3 = require('../s3');
const fs = require('fs')
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

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

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpg`;
  req.file.path = `public/img/user/${req.file.filename}`;

  await sharp(req.file.buffer)
    .resize(300, 300)
    .toFormat('jpg')
    .jpeg({ quality: 90 })
    .toFile(req.file.path)

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

exports.getUserProfilePic = async (req, res, next) => {
  const readStream = await awsS3.getFile(req.params.key)
  if (readStream) readStream.pipe(res);
}

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

exports.updateProfilePic = catchAsync(async (req, res, next) => {
  let profilePicUploadResult;
  if (req.file) {
    const { photo } = await User.findById(req.params.id).select('photo');
    if (photo && photo !== "user-default-pic.jpg") await awsS3.deleteFile(photo);
    profilePicUploadResult = await awsS3.uploadFile(req.file);
    await unlinkFile(req.file.path);

    const updatedProfilePicture = await User.findByIdAndUpdate(req.params.id, { 'photo': req.file.filename }, {
      new: true,
      runValidators: true,
      select: 'photo'
    })
  
    if (profilePicUploadResult) {
      res.status(200).json({
        status: 'succes',
        data: {
          updatedProfilePic: updatedProfilePicture.photo,
          userProfilePicPath: `userProfilePic/${profilePicUploadResult.Key}`
        }
      })
    } else {
      res.status(200).json({
        status: 'succes',
        data: {
          updatedProfilePic: updatedProfilePicture.photo
        }
      })
    }
  } else {
    return next(new AppError('This route is for profile picture update! Please submit a file.'))
  }

})

exports.getUserRecipes = catchAsync(async (req, res, next) => {
  let userId;
  if (req.user) {
    userId = req.user.id 
  } else {
    userId = req.params.id
  }
  const query = Recipe.where('user').equals(userId)
  const userRecipes = await query

  if (!userRecipes) return next(new AppError("You don't have recipes yet!"))

  res.status(200).json({
    status: 'success',
    length: userRecipes.length,
    data: {
      userRecipes
    }
  })
})

exports.getRecipesUserLiked = catchAsync(async (req, res, next) => {
  const { likedRecipes } = await User.findById(req.params.id).select('likedRecipes') 
  const recipes = [];
  for (const id of likedRecipes) {
    const recipe = await Recipe.findById(id);
    recipes.push(recipe)
  }

  res.status(200).json({
    status: 'success',
    data: {
      recipes
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

