require("dotenv").config()
const express = require('express');
const createError = require("http-errors")
const logger = require('morgan')

require("./configs/db.config")

const app = express()

app.use(express.json())
app.use(logger('dev'))

const api = require('./configs/routes.config')
app.use('/v1', api)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.info(`Application running in port ${PORT}`))