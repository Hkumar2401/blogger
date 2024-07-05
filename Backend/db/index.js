import mongoose from "mongoose";
import { MONGOOSE_CONNECTION_STRING } from "../../secrets.js";

mongoose.connect(MONGOOSE_CONNECTION_STRING);

const UserSchema = new mongoose.Schema({
    email: String,
    hashedPassword: String,
    fullName: String,
    followers: Number,
    following: Number,
    createdBlogs: {total : Number, blogs: Array},
    publishedBlogs: {total : Number, blogs: Array},
    likedBlogs: {total : Number, blogs: Array},
});

const User = mongoose.model("User", UserSchema);

export {User};