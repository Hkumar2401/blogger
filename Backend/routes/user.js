import { Router } from "express";
import { User } from "../db/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const saltRounds = 10;
import { JWT_PASSWORD } from "../../secrets.js";
const router = Router();

router.post("/signup", async (req, res) => {
  const { email, password, fullName } = req.body;

  if (!email || !password || !fullName) {
    res.json({
      message: "You cannot leave the input field empty",
    });
  }

  try {
    const findDuplicate = await User.findOne({ email: email });
    if (findDuplicate) {
      res.json({
        status: false,
        message: "User already exists with the email",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = new User({
        email,
        hashedPassword,
        fullName,
        followers: 0,
        following: 0,
        createdBlogs: {
          total: 0,
          blogs: [],
        },
        publishedBlogs: {
          total: 0,
          blogs: [],
        },
        likedBlogs: {
          total: 0,
          blogs: [],
        },
      });

      newUser.save();
      res.json({
        status: true,
        message: "New User added successfully!",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      const match = await bcrypt.compare(password, foundUser.hashedPassword);
      if (match) {
        const token = jwt.sign(
          { email: email, fullName: foundUser.fullName },
          JWT_PASSWORD
        );
        res.json({
          token: token,
          message: "Signed in successfully",
          fullName: foundUser.fullName,
        });
      } else {
        res.json({
          message: "Incorrect Password",
        });
      }
    }
    else{
      res.json({
        message: "User not found with the provided email"
      })
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
