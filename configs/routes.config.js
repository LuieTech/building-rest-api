const express = require("express");
const router = express.Router()
const author = require("../controllers/author.controller")

router.get("/authors", author.list)
router.post("/authors", author.create)
router.get("/authors/:id", author.detail)
router.delete("/authors/:id", author.delete)

module.exports = router