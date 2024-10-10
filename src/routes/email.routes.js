import { Router } from "express";
import { sendEmail, getEmailStatus } from "../controllers/emailController";

const router = express.Router();

router.post("/send", sendEmail);
router.get("/:emailId/status", getEmailStatus);

export default router;
