const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

const multer = require('multer');

const path = require("path");

require("dotenv").config();

const app = express();

//import routes
const todolistRoutes = require("./routes/todolist");
const authRoutes = require("./routes/auth");



const dotenv = require("dotenv");
dotenv.config();

// database connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"));

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// routes middleware
app.use("/api", todolistRoutes);
app.use("/api", authRoutes);

app.use(express.static(path.join(__dirname, 'build')));


app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));