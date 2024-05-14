import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import UserModel from './models/UserModel.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


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
app.use('/uploads', express.static(`${__dirname}/uploads`));
app.use(cookieParser()); // used for req.cookies, also do ceredentials: include in front end

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI);

app.use(express.json({ limit: '10mb' })); // middleware
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})

const multerUpload = multer({
  limits: {
    fieldSize: 10 * 1024 * 1024, // 10 mb
  },

  dest: 'uploads/'
});

// const multerUpload = multer({ dest: 'uploads/' });



const PRIVATE_KEY = process.env.PRIVATE_KEY; // used in jwt

// ---- End Points ----

// -- Sign Up --
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
        secure: process.env.NODE_ENV !== "Development"
      });

      res.status(201).json("Successful sign up");

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
        secure: process.env.NODE_ENV !== "Development"
      });

      res.status(200).json("Successful log in");
    }
    else {
      res.status(401).json("Wrong Password");
    }
  }
  catch (err) {
    res.status(401).json("Incorrect credentials");
  }
})


// -- Verify User --
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


// -- Logout --
app.post('/logout', async (req, res) => {
  try {
    res.cookie('token', '');
    res.status(200).json(null)
  }
  catch (e) {
    res.status(500).json("Error logging out")
  }
})


// -- Post Blog --
app.post('/post', multerUpload.single('fileView'), (req, res) => {
  const { title, summary, content, timeNow, likes } = req.body;
  const { fileView } = req.file;
  const token = req.cookies;

  res.status(200).json(title, summary, content, timeNow, likes, fileView);
})