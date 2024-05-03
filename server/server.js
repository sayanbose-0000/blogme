import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

const app = express();

// getting environment variables
dotenv.config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const FRONT_URL = process.env.FRONT_URL;

app.listen(PORT, () => {
  console.log("App running perfectly...");
})

// allowed stuffs by cors
const corsOptions = {
  origin: FRONT_URL,
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(express.json()); // middleware
app.use(cors(corsOptions)); // for preventing cors error

// connecting mongodb
mongoose.connect(MONGO_URI);

const saltRounds = 10; // used in bcrypt for hasing the password

// ----------- END POINTS --------------


// ---------- SIGN UP ---------------
app.post('/server/signup', (req, res) => {
  const { userName, email, password } = req.body;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    // write the mongodb accessing code here
  });

}) 