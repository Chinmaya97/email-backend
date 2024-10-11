import { Router } from "express";
import { sendEmail, getEmailStatus } from "../controllers/emailController";

const router = express.Router();

router.post("/send", sendEmail); // Route for sending emails
router.get("/:emailId/status", getEmailStatus); // Route for getting the status of an email by ID

export default router;
