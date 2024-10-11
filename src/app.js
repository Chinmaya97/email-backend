import express from "express"; // Importing express framework
import http from "http"; // Importing HTTP module to create server
import socketio from "socket.io"; // Importing Socket.io for real-time communication
import emailQueue from "./workers/email.worker.js"; // Importing email worker queue
import cors from "cors"; // Importing CORS for handling cross-origin requests
import morgan from "morgan"; // Importing morgan for HTTP request logging

const app = express(); // Create an instance of express
const server = http.createServer(app); // Create a server instance with the express app
const io = socketio(server); // Initialize Socket.io

// Middleware for CORS and JSON parsing
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Allowed origin from environment variables
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.use(morgan("dev")); // Add morgan for logging requests in 'dev' format

app.use(express.json({ limit: "16kb" })); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // Parse incoming URL-encoded requests

//routes import
import emailRoutes from "./routes/email.routes.js"; // Email related routes
import healthcheckRouter from "./routes/healthcheck.routes.js"; // Health check route

//routes declaration
app.use("/api/v1/healthcheck", healthcheckRouter); // Health check route
app.use("/api/v1/emails", emailRoutes); // Email routes

// Listening to emailQueue events
emailQueue.on("completed", (job) => {
  io.emit("emailStatus", { emailId: job.data.emailId, status: "sent" }); // Emit email status as sent
});

emailQueue.on("failed", (job) => {
  io.emit("emailStatus", { emailId: job.data.emailId, status: "failed" }); // Emit email status as failed
});

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => console.log("Client disconnected")); // Log on client disconnect
});

// Export the app for use in server initialization
export { app };
