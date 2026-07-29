require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

connectDB(); //connection to DB

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});
