import express from "express";
import filesRoutes from "./routes/files";
import userRoutes from "./routes/users";
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(filesRoutes);
app.use(userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});