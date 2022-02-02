const Recipe = require('../model/recipeModel')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

exports.getAllRecipes = catchAsync( async (req, res, next) => {
    const recipes = await Recipe.find()

    res.status(200).json({
        status: 'success',
        length: recipes.length,
        data: {
            recipes
        }
    })
})

exports.createRecipe = async (req, res, next) => {
    if(!req.body.user) req.body.user = req.user.id

    const recipe = await Recipe.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            recipe
        }
    })
}

exports.getRecipe = async (req, res, next) => {
    const recipe = await Recipe.findById(req.params.id).populate('user')

    if(!recipe) {
        return next(new AppError('No recipe with this ID found!', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            recipe
        }
    })
}

exports.getMostRecent = catchAsync( async (req, res, next) => {
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

exports.getMostLiked = catchAsync( async (req, res, next) => {
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

exports.isUserRecipe = operation => catchAsync( async (req, res, next) => {
    const recipe = await Recipe.findById(req.params.id)
    
    if(!recipe) return next(new AppError("No recipe with that ID!", 404))

    if(recipe.user.id !== req.user.id) return next(new AppError(`You can't ${operation} someone else's recipe!`, 403))

    next()
})

exports.updateRecipe = catchAsync( async (req, res, next) => {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        status: "succes",
        data: {
            updatedRecipe
        }
    })
})

exports.deleteRecipe = catchAsync( async (req, res, next) => {
    await Recipe.findByIdAndDelete(req.params.id)

    res.status(204).json({
        status:'success',
        data: null
    })
})
