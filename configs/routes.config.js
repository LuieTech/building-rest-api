const express = require("express");
const router = express.Router()
const author = require("../controllers/author.controller")
const book = require("../controllers/book.controller")

//Author routes
router.get("/authors", author.list)
router.post("/authors", author.create)
router.get("/authors/:id", author.detail)
router.delete("/authors/:id", author.delete)

//Book routes

router.post("/author/:authorId/books", book.create)
router.delete("/books/:id", book.delete)

module.exports = router