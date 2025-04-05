import agenda from "../config/agenda.js";
import Automation from "../model/Automation.js";

export const handleAutomationData = async (req, res) => {
  try {
    const { clerkId, leads, email, delay } = req.body;

    // 🔐 Check if clerkId exists and is a non-empty string
    if (!clerkId || typeof clerkId !== "string" || clerkId.trim() === "") {
      console.error("❌ Clerk ID is missing or invalid:", clerkId);
      return res.status(400).json({ error: "Clerk ID is missing or invalid." });
    }

    // 👥 Validate leads array
    if (!Array.isArray(leads) || leads.length === 0) {
      console.error("❌ Leads field is empty or invalid:", leads);
      return res
        .status(400)
        .json({ error: "Leads field is empty or invalid." });
    }

    // 📧 Validate email object (only check main structure)
    if (
      typeof email !== "object" ||
      !email ||
      Object.keys(email).length === 0 ||
      !Array.isArray(email.attachments)
    ) {
      console.error("❌ Email field is missing or invalid:", email);
      return res
        .status(400)
        .json({ error: "Email field is missing or invalid." });
    }

    // 🕐 Validate delay object
    if (
      typeof delay !== "object" ||
      !delay ||
      Object.keys(delay).length === 0 ||
      !delay.delayDate ||
      !delay.delayTime
    ) {
      console.error("❌ Delay field is missing or invalid:", delay);
      return res
        .status(400)
        .json({ error: "Delay field is missing or invalid." });
    }

    // ✅ Save to MongoDB
    const automation = new Automation({
      clerkId,
      leads,
      email,
      delay,
    });

    await automation.save();

    const { delayDate, delayTime } = delay;

    let delayDateTimeStr = `${delayDate}T${delayTime}:00`;
    let delayDateTime = new Date(delayDateTimeStr);

    console.log(
      "Scheduled job for:",
      isNaN(delayDateTime.getTime()) || delayDateTime <= new Date()
        ? "in 1 minute"
        : delayDateTime.toString()
    );

    // If date is invalid or not in the future, fallback to "in 1 minute"
    if (isNaN(delayDateTime.getTime()) || delayDateTime <= new Date()) {
      console.warn(
        "Given time is invalid or not in the future. Defaulting to 'in 1 minute'."
      );

      await agenda.schedule("in 1 minute", "log-automation-data", {
        clerkId,
        leads,
        email,
        delay,
      });
    } else {
      // Time is valid and in the future
      await agenda.schedule(delayDateTime, "log-automation-data", {
        clerkId,
        leads,
        email,
        delay,
      });
    }

   

    // // gonna change the time after all the testing is done
    // // 🗓 Schedule the job via Agenda
    // await agenda.schedule("in 1 minute", "log-automation-data", {
    //   clerkId,
    //   leads,
    //   email,
    //   delay,
    // });

    console.log("🕐 Email scheduled to log automation data ");

    // ✅ Respond with success
    res.status(200).json({ message: "Automation data stored successfully." });
    // console.log("✅ Automation data stored successfully:", automation);
  } catch (error) {
    console.error("💥 Error processing automation data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
