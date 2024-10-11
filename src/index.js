import dotenv from "dotenv"; // Import dotenv for environment variable
import connectDB from "./db/index.js"; // Import the database connection function
import { app } from "./app.js"; // Import the Express app instance

dotenv.config({
  path: "./.env", // Load environment variables from the .env file
});
//connect  to mongoDB
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      // listen on port 8000
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`); //running port
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err); // any connection errors
  });
