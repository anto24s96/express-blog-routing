//importazione moduli
const posts = require("../controllers/posts.js");
const express = require("express");

//Creazione router Express
const router = express.Router();

//Definizione rotte post
router.get("/", posts.index);
router.get("/create", posts.create);
router.get("/:slug", posts.show);
router.get("/:slug/download", posts.downloadImage);

module.exports = router;
