import Agenda from 'agenda';
import dotenv from 'dotenv';

dotenv.config(); // ✅ 
// console.log("🚀 Initializing Agenda...")
const agenda = new Agenda({
  db: {
    address: process.env.MONGO_URI, // your Atlas URI here
    collection: 'scheduledEmails',  // name the collection for jobs
  },
});

export default agenda;
