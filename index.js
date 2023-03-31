require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const fileRouter = require("./routes/file");
const errorMiddleware = require("./middlewares/errorMiddleware");

const PORT = process.env.PORT || 5000;
const app = express({
	origin: process.env.CLIENT_URL,
	credentials: true,
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({}));

app.use(authRouter);
app.use(userRouter);
app.use("/file", fileRouter);

app.use(errorMiddleware);

const start = () => {
	app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
};

start();
