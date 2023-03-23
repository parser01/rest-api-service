require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const errorMiddleware = require("./middlewares/errorMiddleware");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(authRouter);
app.use(errorMiddleware);

const start = () => {
	app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
};

start();
