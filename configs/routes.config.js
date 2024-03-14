const express = require("express");
const router = express.Router()
const author = require("../controllers/author.controller")

router.post("/author-create", author.create)

module.exports = router