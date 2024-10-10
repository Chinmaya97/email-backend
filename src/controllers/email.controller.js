import  Email from '../models/email.model.js';
import emailQueue from '../workers/email.worker.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const sendEmail = asyncHandler( async (req, res) => {
    const { to, subject, body } = req.body;
    const newEmail = new Email({ to, subject, body });
    await newEmail.save();
    emailQueue.add({ emailId: newEmail._id });
    return res.status(201).json(
        new ApiResponse(201, { emailId: newEmail._id }, "Email queued for sending")
    );

} )

const getEmailStatus = asyncHandler( async (req, res) => {
    const { emailId } = req.params;
    const email = await Email.findById(emailId);
    if (!email) {
        throw new ApiError(404, "Email not found")
    }
    return res.status(200).json(
        new ApiResponse(200, { status: email.status }, "Email status retrieved successfully")
    );
})

export { sendEmail,getEmailStatus}