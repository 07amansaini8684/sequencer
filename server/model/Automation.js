import mongoose from "mongoose";

// Define Attachment Schema
const AttachmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: Number, required: true },
  type: { type: String, enum: ["image", "video"], required: true },
});

// Define Email Schema
const EmailSchema = new mongoose.Schema({
  offerType: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  language: { type: String, required: true },
  attachments: { type: [AttachmentSchema], default: [] },
});

// Define Delay Schema
const DelaySchema = new mongoose.Schema({
  finalTime: { type: String, default: "" },
  delayDate: { type: String, required: true },
  delayTime: { type: String, required: true },
  formattedTimeWithPeriod: { type: String, required: true },
  timePeriod: { type: String, enum: ["AM", "PM"], required: true },
});

// Define Main Automation Schema
const AutomationSchema = new mongoose.Schema({
  clerkId: { type: String, required: true }, // Clerk ID
  leads: { type: [String], required: true }, // Array of lead names
  email: { type: EmailSchema, required: true }, // Embedded Email document
  delay: { type: DelaySchema, required: true }, // Embedded Delay document
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

// Create a Model from Schema
const Automation = mongoose.model("Automation", AutomationSchema);
export default Automation;
