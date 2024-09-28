const express = require("express");
const courses = require("../Controllers/course-controller");

const router = express.Router();
router.get("/courses", courses);

module.exports = router;
