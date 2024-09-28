const { Schema, model } = require("mongoose");
const courseSchema = new Schema({
  coursename: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
});
const Course = new model("Course", courseSchema);
module.exports = Course;
