import  Queue from 'bull'
import  sendEmail from '../config/mail.config.js'
import  Email from '../models/email.model.js';

const emailQueue = new Queue('emailQueue', process.env.REDIS_URL);

emailQueue.process(async (job, done) => {
    const { emailId } = job.data;
    const email = await Email.findById(emailId);
  
    const result = await sendEmail(email);
    if (result.success) {
      email.status = 'sent';
    } else {
      email.status = 'failed';
    }
    await email.save();
    done();
  });

  module.exports = emailQueue;