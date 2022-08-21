const Recipe = require('../model/recipeModel')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const awsS3 = require('../s3');
const multer = require('multer')
const sharp = require('sharp')
const fs = require('fs')
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const multerStorage = multer.memoryStorage();

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

exports.uploadRecipeImageCover = upload.single('imageCover')

exports.resizeRecipeImageCover = catchAsync(async (req, res, next) => {
  if (!req.file) return next()

  req.file.filename = `recipe-image-${req.user.id}-${Date.now()}.jpeg`
  req.file.path = `public/img/recipeImageCover/${req.file.filename}`

  await sharp(req.file.buffer)
    .resize(400, 300)
    .toFormat('jpg')
    .jpeg({ quality: 90 })
    .toFile(req.file.path)

  next()
})

exports.getAllRecipes = catchAsync(async (req, res, next) => {
  const recipes = await Recipe.find()

  res.status(200).json({
    status: 'success',
    length: recipes.length,
    data: {
      recipes
    }
  })
})

exports.createRecipe = catchAsync(async (req, res, next) => {
  let recipeInfo;
  if (!req.body.user) req.body.user = req.user.id

  if (!req.body.recipeInfo) recipeInfo = req.body;
  else recipeInfo = JSON.parse(req.body.recipeInfo);

  if (req.file) recipeInfo.imageCover = req.file.filename;
  recipeInfo.user = req.body.user;
  let recipe = await Recipe.create(recipeInfo);
  recipe = await recipe.populate({ path: 'user', select: 'name photo' }); 
  
  if(req.file) {
    const imageCoverUploadResult = await awsS3.uploadFile(req.file);
    await unlinkFile(req.file.path);
    res.status(201).json({
      status: 'success',
      data: {
        recipe,
        imageCoverPath: `/images/${imageCoverUploadResult.Key}`
      }
    })
  } else {
    res.status(201).json({
      status: 'success',
      data: {
        recipe
      }
    })
  }
})

exports.updateRecipe = catchAsync(async (req, res, next) => {
  let recipeInfo;
  if (!req.body.recipeInfo) recipeInfo = req.body;
  else recipeInfo = JSON.parse(req.body.recipeInfo);

  let imageCoverUploadResult;
  if (req.file) {
    const { imageCover } = await Recipe.findById(req.params.id).select('imageCover');
    if (imageCover) await awsS3.deleteFile(imageCover);
    recipeInfo.imageCover = req.file.filename;
    imageCoverUploadResult = await awsS3.uploadFile(req.file);
    await unlinkFile(req.file.path);
  }

  const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, recipeInfo, {
    new: true,
    runValidators: true
  })

  if (imageCoverUploadResult) {
    res.status(200).json({
      status: 'succes',
      data: {
        updatedRecipe,
        imageCoverPath: `images/${imageCoverUploadResult.Key}`
      }
    })
  } else {
    res.status(200).json({
      status: 'succes',
      data: {
        updatedRecipe
      }
    })
  }
})

exports.getRecipeImageCover = async (req, res, next) => {
  const readStream = await awsS3.getFile(req.params.key)
  if (readStream) readStream.pipe(res);
}

exports.getRecipe = catchAsync(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id)

  if (!recipe) {
    return next(new AppError('No recipe with this ID found!', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      recipe
    }
  })
})

exports.getMostRecent = catchAsync(async (req, res, next) => {
  const page = req.params.page * 1 || 1 //1
  const limit = 8
  const skip = (page - 1) * limit // 0

  const query = Recipe.find().skip(skip).limit(limit).sort({ "createdAt": -1 })

  const recipes = await query.find()

  res.status(200).json({
    status: 'success',
    length: recipes.length,
    data: {
      recipes
    }
  })
})

exports.getMostLiked = catchAsync(async (req, res, next) => {
  const page = req.params.page * 1 || 1
  const limit = 8
  const skip = (page - 1) * limit

  const query = Recipe.find().sort('-likes').skip(skip).limit(limit)
  const recipes = await query.find()

  res.status(200).json({
    status: 'success',
    length: recipes.length,
    data: {
      recipes
    }
  })
})

exports.isUserRecipe = operation => catchAsync(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id)

  if (!recipe) return next(new AppError("No recipe with that ID!", 404))

  if (recipe.user.id !== req.user.id) return next(new AppError(`You can't ${operation} someone else's recipe!`, 403))

  next()
})


exports.deleteRecipe = catchAsync(async (req, res, next) => {
  const { imageCover } = await Recipe.findByIdAndDelete(req.params.id);
  if (imageCover && imageCover !== "default.jpg") await awsS3.deleteFile(imageCover);

  res.status(204).json({
    status: 'success',
    data: null
  })
})
