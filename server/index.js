import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import UserModel from "./User.js";

const PORT = 4000;

const app = express();

mongoose
  .set("strictQuery", true)
  .connect("mongodb://localhost:27017/test")
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>hello world</h1>");
});

app.get("/users", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Create a new user and save it to the database
    const newUser = new UserModel({
      name: name,
      email: email,
      password: password,
    });
    await newUser.save((error, user) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error adding user to database");
      } else {
        res.send(user);
        // res.status(200).send("User added to database");
      }
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
