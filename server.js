require("dotenv").config();
const cors= require("cors")
const express = require("express");
const app = express();
const authRouter = require("./Routes/auth-router");
const connectDb = require("./Utils/db");
const courseRouter = require("./Routes/course-router");

const Corsoptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  credentials: true,
};
app.use(cors(Corsoptions))
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/data", courseRouter);

const port = 3000;

connectDb().then(() => {
  app.listen(port, () => {
    console.log("Server running on port 3000");
  });
});

