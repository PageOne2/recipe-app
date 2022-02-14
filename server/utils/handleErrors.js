const AppError = require('./appError')

const handleCastError = err => {
    const message = `Invalid ${err.path}: ${err.value}`
    return new AppError(message, err.statusCode)
}

const handleValidationError = () => {
    const message = 'Invalid input data!'
    return new AppError(message, 400)
}

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

const sendErrorProd = (err, res) => {
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    } else {
        res.status(err.statusCode).json({
            status: err.status,
            message: 'Something went wrong!'
        })
    }
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if(process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    } else if(process.env.NODE_ENV === 'production') {
        let error = { ...err }
        error.message = err.message

        if(err.name === 'CastError') error = handleCastError(error)
        if(err.name === 'ValidationError') error = handleValidationError()

        sendErrorProd(error, res)
    }
}