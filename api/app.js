import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import postRoute from "./routes/post.route.js"
import authRoute from "./routes/auth.route.js"
import userRoute from "./routes/user.route.js"
import testRoute from "./routes/test.route.js"

const app = express();

// cors untuk meprotect api
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
// app.use(cors());
// enable express use json
app.use(express.json());
// enable cookie
app.use(cookieParser())

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute)

app.listen(3003, () => {
  console.log("server is running");
});