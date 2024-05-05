import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import UserModel from './models/UserModel.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();

// getting environment variables
dotenv.config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const FRONT_URL = process.env.FRONT_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// allowed stuffs by cors
const corsOptions = {
  origin: FRONT_URL,
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(express.json()); // middleware
app.use(cors(corsOptions)); // for preventing cors error
app.use(cookieParser());

// connecting mongodb
mongoose.connect(MONGO_URI);

app.listen(PORT, () => {
  console.log("App running perfectly...");
})

const saltRounds = 10; // used in bcrypt for hasing the password






// ----------- END POINTS --------------


// ---------- SIGN UP ---------------
app.post('/signup', (req, res) => {
  const { userName, email, password } = req.body;
  bcrypt.hash(password, saltRounds, async function (err, hash) {

    if (err) {
      res.status(400).json("Error hashing password");
    }

    try {
      const userSignUp = await UserModel.create(
        {
          userName,
          email,
          password: hash
        }
      )

      const userLogin = await UserModel.findOne({ email });

      try {
        const passwordOk = bcrypt.compare(password, userLogin.password);

        if (passwordOk) {
          let token = jwt.sign({ username: userLogin.userName, id: userLogin.id }, PRIVATE_KEY);

          res.cookie('token', token, {
            path: '/',
            httpOnly: true,
            maxAge: 30 * 60 * 60 * 24 * 1000,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true
          });

          res.status(200).json("Successfully Logged In");
        }
      }

      catch (e) {
        res.status(400).response("Incorrect Credentials");
      }
    }
    catch (e) {
      res.status(400).json({ message: "User already exists" })
    }
  });
})

/*

// ------- to verify user --------
app.get('/profile', async (req, res) => {
  const { token } = req.cookies; // for this we need to use cookie-parser library
  jwt.verify(token, PRIVATE_KEY, (err, info) => {
    if (err) {
      res.status(404).json("Invalid token");
    }
    res.json(info);
  });
})

*/