import Queue from "bull";
import sendEmail from "../config/mail.config.js";
import Email from "../models/email.model.js";

const emailQueue = new Queue("emailQueue", process.env.REDIS_URL);

emailQueue.process(async (job, done) => {
  try {
    const { emailId } = job.data;
    const email = await Email.findById(emailId);

    if (!email) {
      throw new Error(`Email with ID ${emailId} not found.`);
    }

    const result = await sendEmail(email);

    // Update the email status based on result
    if (result.success) {
      email.status = "sent";
      console.log(`Email with ID ${emailId} sent successfully.`);
    } else {
      email.status = "failed";
      console.error(`Failed to send email with ID ${emailId}:`, result.error);
    }

    await email.save();
    done(); // Job successfully processed
  } catch (error) {
    console.error(
      `Error processing email with ID ${job.data.emailId}:`,
      error.message
    );
    done(error); // Mark the job as failed with the error
  }
});

export default emailQueue;
