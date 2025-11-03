import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

import insertAPI from "./API/insert.js";
import modifyAPI from "./API/modify.js";
import displayAPI from "./API/display.js";
import authAPI from "./API/authentication.js"

app.use("/insert", insertAPI);
app.use("/modify", modifyAPI);
app.use("/display", displayAPI);
app.use("/auth", authAPI);

app.get("/", (req, res) => {
  res.send("Server is Running!");
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
