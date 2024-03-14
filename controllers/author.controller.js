const Author = require("../models/author.model")

module.exports.create = (req, res, next) => {

  Author.create(req.body)
    .then(author => res.status(201).json(author))
    .catch(error => next(error))

}