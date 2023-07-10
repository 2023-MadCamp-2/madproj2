const express = require("express");

const router = express.Router();

const auth = require("./auth");
const contact = require("./contact/contact");

router.get("/", (req, res) => {
    res.locals.title = "Node Chat!";
    res.json("{index}");
});

router.use("/auth", auth);

module.exports = router;