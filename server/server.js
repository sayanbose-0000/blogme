import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import UserModel from './models/UserModel.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();

// handling stuffs allowed by cors
const FRONT_URL = process.env.FRONT_URL;
const corsOptions = {
  origin: FRONT_URL,
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}
app.use(cors(corsOptions));

app.use(cookieParser());

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI);

app.use(express.json()) // middle ware
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})

// ---- End Points ----

// -- Sign Up --
const PRIVATE_KEY = process.env.PRIVATE_KEY;

app.post('/signup', (req, res) => {
  const { userName, email, password } = req.body;
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, async function (err, hashedPassword) {
    if (err) {
      res.status(500).json("Error hashing password");
      return;
    }

    try {
      const userSignUpDoc = await UserModel.create({
        userName,
        email,
        password: hashedPassword
      })

      var token = jwt.sign({ userName: userSignUpDoc.userName, id: userSignUpDoc._id }, PRIVATE_KEY);

      res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30, // token valid for a month
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true
      });

      res.status(200).json("Successful sign up");

    }
    catch (err) {
      console.log(err)
      res.status(500).json("Error signing up")
    }
  });
})

// -- Log In --
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userLoginDoc = await UserModel.findOne({ email });

    const passwordIsOkay = await bcrypt.compare(password, userLoginDoc.password);

    if (passwordIsOkay) {
      var token = jwt.sign({ userName: userLoginDoc.userName, id: userLoginDoc._id }, PRIVATE_KEY);

      res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30, // token valid for a month
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true
      });

      res.status(200).json("Successful log in");
    }
    else {
      res.status(500).json("Wrong Password");
    }
  }
  catch (err) {
    res.status(500).json("Incorrect credentials");
  }
});

// // -- Verify User --
app.get('/profile', async (req, res) => {
  const { token } = req.cookies; // using cookie parser library

  jwt.verify(token, PRIVATE_KEY, (err, info) => {

    if (err) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }
    res.status(200).json(info);
  });
})

app.post('/logout', async (req, res) => {
  try {
    res.cookie('token', '');
    res.status(200).json(null)
  }
  catch (e) {
    res.status(500).json("Error logging out")
  }
})

app.post('/post', (req, res) => {
  const {fileView, title, summary, content, date, likes} = req.cookies;
  console.log(fileView, title, summary, content, date, likes);
})