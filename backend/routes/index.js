const express = require("express");

const router = express.Router();

const auth = require("./auth");
const contact = require("./contact/contact");
const chat = require("./chat/chat");
const history = require("./history/history");

router.get("/", (req, res) => {
    res.locals.title = "Node Chat!";
    res.json("{index}");
});

router.use("/auth", auth);
router.use("/contact", contact);
router.use("/chat", chat);
router.use("/history", history);

module.exports = router;