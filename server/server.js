import express, { response } from 'express';
import 'dotenv/config';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import UserModel from './models/UserModel.js';
import PostModel from './models/PostModel.js';
import { v2 as cloudinary } from 'cloudinary';

// to be used by multer
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const multerUpload = multer({ dest: 'uploads/' });


// multer criterias set
// const multerUpload = multer({
//   limits: {
//     fieldSize: 10 * 1024 * 1024, // 10 mb
//   },

//   dest: 'uploads/'
// });

const app = express();

// handling stuffs allowed by cors
const FRONT_URL = process.env.FRONT_URL;
const corsOptions = {
  origin: FRONT_URL,
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}

cloudinary.config({
  CLOUDINARY_URL: process.env.CLOUDINARY_URL
});

// middle wares and stuffs
app.use(cors(corsOptions));
app.use(cookieParser()); // used for req.cookies, also do ceredentials: include in front end
app.use(express.json({ limit: '10mb' })); // middleware
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/uploads', express.static(`${__dirname}/uploads`)); // multer muddleware

// conntecting to mongodb database
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI);

// listening on port XYZ
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App listening...`);
})

const PRIVATE_KEY = process.env.PRIVATE_KEY; // to be used in jwt


// -----------------------------------------------------------------------------------------------------------------------------


// ---- End Points ----

// -- Sign Up --
app.post('/signup', (req, res) => {
  const { userName, email, password } = req.body;
  const saltRounds = 10; // used in bcrypt

  bcrypt.hash(password, saltRounds, async function (err, hashedPassword) { // bcrypt hashes password and stores in hashedPassword
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

      res.cookie('token', token, {  // setting cookie with age and other stuffs
        path: '/',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30, // token valid for a month
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV !== "Development"
      });

      res.status(201).json("Successful sign up");

    } catch (err) {
      res.status(500).json("Error signing up");
    }
  });
})


// -- Log In --
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userLoginDoc = await UserModel.findOne({ email });

    const passwordIsOkay = await bcrypt.compare(password, userLoginDoc.password); // bcrypt compare password

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
    } else {
      res.status(401).json("Wrong Password");
    }
  } catch (err) {
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
  })
})


// -- Logout --
app.post('/logout', async (req, res) => {
  try {
    res.cookie('token', '');
    res.status(200).json(null);
  } catch (e) {
    res.status(500).json("Error logging out");
  }
})


// -- Post Blog --
app.post('/postblog', multerUpload.single('image'), (req, res) => {
  const { title, summary, content, timeNow, likes } = req.body;

  if (!req.file) {
    res.status(400).json("No file uploaded");
  }

  const { token } = req.cookies;

  try {
    jwt.verify(token, PRIVATE_KEY, async (err, info) => {
      if (err) {
        res.status(401).json("Invalid User, Please Sign In");
        return;
      }

      const { originalname, path } = req.file; // file comes in this format with many fields, we use this one { fieldname: 'image', originalname: '.trashed-1703216360-IMG20231120022400.jpg', encoding: '7bit', mimetype: 'image/jpeg', destination: 'uploads/', filename: '6a8b3ec3ef2484d2cd87ae1973862b3e', filename: '6a8b3ec3ef2484d2cd87ae1973862b3e', filename: '6a8b3ec3ef2484d2cd87ae1973862b3e', path: 'uploads\\6a8b3ec3ef2484d2cd87ae1973862b3e', size: 690294 }
      const parts = originalname.split('.') // seperates file name and extension
      const extension = parts[parts.length - 1]; // gets the last value of parts array that is bound to be the extension

      const date = new Date().getTime(); // returns the number of milliseconds for this date since the epoch, which is defined as the midnight at the beginning of January 1, 1970, UTC.
      const newPath = `${__dirname}/uploads/${date}.${extension}`;

      fs.renameSync(path, newPath);

      const uploadImage = async (newPath) => {
        // Use the uploaded file's name as the asset's public ID and 
        // allow overwriting the asset with new versions
        const options = {
          folder: "blogme-images",
          use_filename: true,
          unique_filename: false,
          overwrite: true,
        };

        try {
          // Upload the image
          const result = await cloudinary.uploader.upload(newPath, options);
          // console.log(result);
          // return result.public_id;
          return result.secure_url;
        }

        catch (error) {
          res.status(500).json("Error uploading picure");
        }
      }

      const secure_url = await uploadImage(newPath);

      try {
        const postDoc = await PostModel.create({
          imagePath: secure_url,
          title,
          summary,
          content,
          author: info.id,
          date: timeNow,
          likes
        })

        if (postDoc) {
          fs.unlinkSync(newPath); // removes img drom uploads folder
        }

        res.status(200).json({ message: "Successfully posted your blog", postId: postDoc._id });
      } catch (err) {
        res.status(500).json("Error posting the blog");
      }
    })

  } catch (err) {
    res.status(500).json("Error uploading file");
  }
})


// -- Home Page --
app.get('/home', async (req, res) => {
  try {
    const blogsDoc = await PostModel.find().sort({ date: -1, likes: -1 }).populate("author");
    res.status(200).json(blogsDoc);
  } catch (err) {
    res.status(500).json("Cannot fetch notes!");
    console.log(err);
  }
})

// -- Blog Page --
app.get('/post/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const postDoc = await PostModel.findById(id).populate("author");
    res.status(200).json(postDoc);
  } catch (err) {
    res.status(500).json("Error fetching blog");
  }
})