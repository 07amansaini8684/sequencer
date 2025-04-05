// utils/sendScheduledEmail.js
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export const sendScheduledEmail = async ({
  fromName,
  fromEmail,
  recipients,
  subject,
  text,
  html,
  attachments,
}) => {
  /**
   * ----------------------------------------------
   * ⚙️ SMTP CREDENTIAL CHECK
   * ----------------------------------------------
   */
  if (!process.env.BREVO_SMTP_LOGIN || !process.env.BREVO_SMTP_KEY) {
    console.error("❌ SMTP credentials not set.");
    return;
  }

  /**
   * ----------------------------------------------
   * ✉️ EMAIL TRANSPORT + VALIDATION
   * ----------------------------------------------
   */
  console.log("📧 Sending email...");

  const emailList = Array.isArray(recipients) ? recipients : [];
  console.log("To:", emailList);
  console.log("From:", `${fromName} <${fromEmail}>`);
  console.log("Subject:", subject);

  if (emailList.length === 0) {
    console.error("❌ No recipients provided.");
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_LOGIN,
        pass: process.env.BREVO_SMTP_KEY,
      },
    });

    const mailOptions = {
      from: `👤 "${fromName}" <${fromEmail}>`,
      to: emailList.join(", "),
      subject: `📝 ${subject}`,
      text,
      html, 
      attachments, 
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};
