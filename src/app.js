import express from "express";
import http from "http";
import socketio from "socket.io";
import emailQueue from "./workers/email.worker.js";

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//routes import
import emailRoutes from "./routes/email.routes.js";
import healthcheckRouter from "./routes/healthcheck.routes.js";

//routes declaration
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/emails", emailRoutes);

emailQueue.on("completed", (job) => {
  io.emit("emailStatus", { emailId: job.data.emailId, status: "sent" });
});

emailQueue.on("failed", (job) => {
  io.emit("emailStatus", { emailId: job.data.emailId, status: "failed" });
});

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
});

export { app };
