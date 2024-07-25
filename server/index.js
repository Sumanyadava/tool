const express = require("express");
const dotenv = require("dotenv");
const conntectDB = require("./config/db.js");
const router = require("./router/router.js");
const cors = require("cors");

const User = require("./models/user.models.js");
const ShortTodo = require("./models/shortTodo.models.js");

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

conntectDB();

const PORT = process.env.PORT || 4000;

//api register
app.use("/api", router);
app.get("/", (req, res) => {
  res.send("server is running...");
});

app.listen(PORT, () => console.log(`server is running at ${PORT}`));
