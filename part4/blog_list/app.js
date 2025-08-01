const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')

const app = express()

logger.info('connecting to MongoDB')

mongoose.connect(config.MONGODB_URI).then(() => {
    logger.info("connected to MongoDB")
}).catch((error) => logger.error('error connecting to MongoDB:', error.message))

app.use(express.json())
app.use('/api/blogs', blogRouter)

app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)

module.exports = app