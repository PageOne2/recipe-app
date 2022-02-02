const express = require('express')
const path = require('path')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')

const recipeRoutes = require('./routes/recipeRoutes')
const userRouter = require('./routes/userRoutes')
const AppError = require('./utils/appError')
const handleGlobalErrors = require('./utils/handleErrors')

const app = express()

console.log(process.env.NODE_ENV)

app.use(express.static(path.join(__dirname, 'public')))

app.use(cors())

// Set security HTTP headers
app.use(helmet())

// Limit requests from same IP adress
const limiter = rateLimit({
    max: 200,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP! Please try again in a hour.'
})
app.use('/api', limiter)

// Body parser
app.use(express.json({ limit: '10kb' }))

// Data sanitization against NoSQL query injection
app.use(mongoSanitize())

// Data sanitization against XSS
app.use(xss())

// Prevent parameter pollution
app.use(hpp())

app.use('/api/recipes', recipeRoutes)
app.use('/api/users', userRouter)

// Handle unhandled routes
app.all('*', (req, res, next) => {
    next(new AppError(`URL ${req.originalUrl} not found in this server!`, 404))
})

app.use(handleGlobalErrors)

module.exports = app