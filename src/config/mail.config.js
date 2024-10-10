import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (emailData) => {
  const msg = {
    to: emailData.to,
    from: "your-email@example.com",
    subject: emailData.subject,
    text: emailData.body,
  };
  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error };
  }
};
module.exports = sendEmail;
