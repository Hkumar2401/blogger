import express from "express";
import cors from "cors"
import bodyParser from "body-parser"
const app = express();
import userRouter from "./routes/user.js";

app.use(cors());
app.use(bodyParser.json());

app.use("/user", userRouter);

const port = 3000;
app.listen(port, ()=>{
    console.log("Server running on port : " + port);
})