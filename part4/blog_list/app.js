require('express-async-errors')
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

logger.info('connecting to MongoDB')

mongoose.connect(config.MONGODB_URI).then(() => {
    logger.info("connected to MongoDB")
}).catch((error) => logger.error('error connecting to MongoDB:', error.message))

app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app