const createError = require("http-errors")
const Book = require("../models/book.model")
const Author = require("../models/author.model")

module.exports.create = (req, res, next) => {

  console.log(req.params.authorId)

  Author.findById(req.params.authorId)
    .then(author => {
      if(!author){
        next(createError(404, "Author not found"))
      } else {
        req.body.author = author.id
        return Book.create(req.body)
                .then(book => res.status(201).json(book))
      }
      
    })
    .catch(error => next(error))

}

module.exports.delete = (req, res, next) => {

  Book.findById(req.params.id)
    .then(book => {
      if(!book){
        next(createError(404, "Book not found"))
      } else {
        return Book.deleteOne({_id: req.params.id})
                .then(() => res.status(204).send())
      }
    })
    .catch(error => next(error))

}