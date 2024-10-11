import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (emailData) => {
  const msg = {
    to: emailData.to,
    from: process.env.SENDGRID_FROM,
    subject: emailData.subject,
    text: emailData.body,
  };
  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error(
      "Error sending email:",
      error.response ? error.response.body : error.message
    );
    return { success: false, error };
  }
};

export default sendEmail;
