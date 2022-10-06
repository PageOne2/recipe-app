const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
    recipeName: {
        type: String,
        required: [true, 'A recipe must have a name!']
    },
    ingredients: {
        type: [String],
        required: [true, 'A recipe must have ingredients!']
    },
    method: {
        type: [String],
        required: [true, 'A recipe must have a method of preparation!']
    },
    preparationTime: {
        type: Number,
        required: [true, "A recipe must have the approximated time until it's ready"]
    },
    imageCover: {
        type: String,
        default: 'default.jpg'
    },
    servings: Number,
    likes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    user : {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A recipe must belong to a user!']
    } 
})

recipeSchema.pre(/^find/, function(next){
    this.populate({
        path: 'user',
        select: 'name photo'
    })

    next()
})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe