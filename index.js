require("dotenv").config();
const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

const start = () => {
	app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
};

start();
