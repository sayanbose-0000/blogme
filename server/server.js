import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import UserModel from './models/UserModel.js';
import jwt from 'jsonwebtoken';

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


const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI);

app.use(express.json()) // middle ware
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})

// ---- End Points----

// -- Sign up --
app.post('/signup', async (req, res) => {
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
      
      const PRIVATE_KEY = process.env.PRIVATE_KEY;
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