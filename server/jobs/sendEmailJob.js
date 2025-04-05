import { sendScheduledEmail } from "../config/nodemailer.js";
import User from "../model/User.js";
const defineSendEmailJob = (agenda) => {
  agenda.define("send-email", async (job) => {
    const { email, subject, message, language, attachments } = job.attrs.data;

    // console.log("📩 Sending email to:", email);
    // console.log("📜 Subject:", subject);
    // console.log("💬 Message:", message);
    // console.log("🌍 Language:", language);
    // console.log("📎 Attachments:", attachments);
    // Here you would integrate with your email service provider
    try {
      // sendTestEmail();
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }

    // Here, instead of actually sending an email, we just log it
  });
};

export default defineSendEmailJob;

// jobs/defineJobs.js
export const defineAutomationJob = (agenda) => {
  agenda.define("log-automation-data", async (job) => {
    const { clerkId, leads, email, delay } = job.attrs.data;

    if (!leads || leads.length === 0) {
      console.error("❌ No leads provided for email automation.");
      return;
    }

    const user = await User.findOne({ clerkId });
    if (!user || !user.email) {
      console.error("❌ User email not found for Clerk ID:", clerkId);
      return;
    }

    const senderEmail = user.email;
    const senderName = user.fullName || "No Name";

    /**
     * ----------------------------------------------
     * 🎯 MOCK LEAD EMAIL ASSIGNMENT (TEMPORARY)
     * ----------------------------------------------
     * Only these labels will work for now:
     * - 'Mywork' → 07amansaini.work@gmail.com
     * - 'Mypersonal' → amansaini2856@gmail.com
     * OR pass direct email like 'test@gmail.com'
     * ----------------------------------------------
     */
    const mockEmailMap = {
      Mywork: "07amansaini.work@gmail.com",
      Mypersonal: "amansaini2856@gmail.com",
    };

    const targetEmails = [];

    leads.forEach((lead) => {
      if (mockEmailMap[lead]) {
        targetEmails.push(mockEmailMap[lead]);
      } else if (lead.includes("@gmail.com")) {
        targetEmails.push(lead);
      }
    });

    if (targetEmails.length === 0) {
      console.error(
        "❌ No valid target emails found for the given leads:",
        leads
      );
      return;
    }

    /**
     * ----------------------------------------------
     * 📨 EMAIL BODY LOGGING (For Debugging)
     * ----------------------------------------------
     */
    // shutting down all the console cuz now everthing is working fine
    // console.log("📧 Email Details:");
    // console.log("From1:", `${senderName} <${senderEmail}>`);
    // console.log("To2:", targetEmails.join(", "));
    // console.log("Subject:", email.subject);
    // console.log("Message:", email.message);
    // console.log("Language:", email.language);
    // console.log("Attachments:", email.attachments?.length || 0);

    /**
     * ----------------------------------------------
     * 🚀 SEND EMAIL
     * ----------------------------------------------
     */

  
    await sendScheduledEmail({
      fromName: senderName,
      fromEmail: senderEmail,
      recipients: targetEmails,
      subject: email.subject,
      text: email.message,
      html: email.message,
      attachments: email.attachments || [],
    });
    // console.log(`✅ Email successfully sent to: ${targetEmails.join(", ")}`);

    /**
     * ----------------------------------------------
     * ⏰ DELAY NOTE:
     * Currently hardcoded to test immediately.
     * Later, replace with:
     * - delay.delayDate
     * - delay.delayTime
     * ----------------------------------------------
     */
  });
};
