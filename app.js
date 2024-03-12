require("dotenv").config()
const express = require('express');
const createError = require("http-errors")
const logger = require('morgan')
const app = express()

app.use(express.json())
app.use(logger('combined'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.info(`Application running in port ${PORT}`))