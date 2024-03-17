require("dotenv").config()
const express = require('express');
const createError = require("http-errors")
const logger = require('morgan')

require("./configs/db.config")

const app = express()

app.use(express.json())
app.use(logger('dev'))

const api = require('./configs/routes.config');
const { default: mongoose } = require("mongoose");
const { create } = require("./controllers/author.controller");
app.use('/v1', api)

app.use((req, res, next) => next(createError(404, "Route not found")));

app.use((error, req, res, next) => {

  if (error instanceof mongoose.Error.CastError && error.message.includes("_id")) {
      error = createError(404, "Resource not found")
    }
  else if (error instanceof mongoose.Error.ValidationError) {
      error = createError(400, error)
  }
  else if (!error.status) {
      error = createError(500, error)
  }

  let errors;
  if(error.errors) {
    errors = Object.keys(error.errors)
      .reduce((newObject, currentKey) => {
        newObject[currentKey] = error.errors[currentKey].message || error.errors[currentKey]
        return newObject
      }, {})
  }

  const data = {
    message: error.message,
    errors
  }

  res.status(error.status).json(data)

})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.info(`Application running in port ${PORT}`))