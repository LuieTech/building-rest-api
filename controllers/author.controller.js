const createError = require("http-errors")
const Author = require("../models/author.model")

module.exports.create = (req, res, next) => {

  Author.create(req.body)
    .then(author => res.status(201).json(author))
    .catch(error => next(error))

}

module.exports.list = (req, res, next) => {

  const criteria = Object.keys(req.query)
                    .reduce((newQueryObject, key) => {
                      newQueryObject[key] = req.query[key];
                      return newQueryObject;
                    }, {})

  Author.find(criteria)
    .then(authors => res.status(200).json(authors))
    .catch(error => next(error))

}

module.exports.detail = (req, res, next) => {

  Author.findById(req.params.id)
    .populate("books")
    .populate("amountOfBooks")
    .then(author => {
      if(!author) next(createError(404, "Author not found"))
      else res.status(200).json(author)
    })
    .catch(error => next(error))

}

module.exports.delete = (req, res, next) => {

  Author.findById(req.params.id)
   .then((author) => {
    if(!author) next(createError(404, "Author not found"))
    else return Author.deleteOne({_id: req.params.id})
          .then(author => res.status(204).send())
   })
   .catch(error => next(error))

}