const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })

const Recipe = require('../model/recipeModel')

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to DB!'))

const recipes = JSON.parse(fs.readFileSync(`${__dirname}/recipes.json`, 'utf-8'))

const importData = async () => {
    try{
        await Recipe.create(recipes)
        console.log('Data succesfully loaded!')
    } catch(err){
        console.log(err)
    }
    process.exit()
}

const deleteData = async () => {
    try{
        await Recipe.deleteMany()
        console.log('Data succesfully deleted!')
    } catch(err){
        console.log(err)
    }
    process.exit()
}

if(process.argv[2] === '--import'){
    importData()
} else if(process.argv[2] === '--delete'){
    deleteData()
}