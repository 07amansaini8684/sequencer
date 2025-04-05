🧩 Visual Email Automation Flow Builder
A no-code drag-and-drop tool to automate email sequences using visual flowcharts, complete with scheduling and multi-lead support.

✨ Thanks for the Opportunity
First and foremost, thank you for giving me the chance to work on this project — it really means a lot. It helped me grow technically, and I thoroughly enjoyed building it from scratch.

📌 Project Overview
This project fulfills the task of creating a visual email automation flowchart, allowing users to design email sequences with drag-and-drop functionality. The user can:

Authenticate securely

Add lead sources (mock/custom)

Schedule email delays

Compose rich emails with media

Execute automated email workflows

It closely resembles modern tools like Zapier, Mailchimp, or SalesBlink, but with a custom-built and extendable codebase.

🛠️ Tech Stack
Layer	Tech Used
Frontend	React, React Flow, Tailwind CSS
State	Zustand (lightweight state management + API handling)
Backend	Node.js, Express.js, MongoDB
Auth	Clerk (authentication) + MongoDB (user persistence)
Email	Nodemailer (via Brevo SMTP integration)
Scheduler	Agenda.js (MongoDB-compatible job scheduler)
🔐 Authentication Flow
Clerk handles authentication.

Upon sign-up, user data is stored in MongoDB.

User sessions are linked to their workflows via Clerk ID.

🧱 Flowchart Features
✅ Drag & Drop Builder (React Flow)
Users can build workflows using draggable nodes.

Each node opens an editor panel on click for custom input.

🧩 Supported Node Types:
Lead Source Node

Choose from mock lists (Mywork, Mypersonal) or

Manually enter custom email leads.

Time Delay Node

Specify time and date to delay email dispatch.

Uses Agenda.js to schedule jobs in the backend.

Email Node

Compose emails (subject, body, language).

Supports image and video attachments (future: Cloudinary support).

📦 State Management (Zustand)
All data (node positions, content, connections) is stored in a Zustand store.

Zustand also handles API calls — no need for Redux or RTK Query.

On clicking Save, data is persisted and shown in a summary view.

Clicking Execute sends the full automation object to the backend.

🧠 Backend Logic
Entry Point: server.js

Main Controller: handleAutomationData.js

Key Logic:
Verifies Clerk ID before storing workflow.

Stores node and edge data into MongoDB.

Extracts scheduling data and registers it via Agenda.

Sends emails using Nodemailer.

📤 Email Handling
SMTP:
Provider: Brevo (formerly Sendinblue)

Reason: Free SMTP tier for up to 300 emails/day.

Email Logic:
If selected leads are from mock lists → sends to hardcoded dev/test emails.

If custom leads entered → sends directly to user-input addresses.

Multiple recipient support.

HTML email support + attachment support (currently local).

🧪 Testing Notes
Tested multiple flows: mock lists, manual leads, various delays.

Emails delivered accurately with scheduled triggers.

Extensive console logs are left in backend for debugging and transparency.

🚫 16. SalesBlink link Issue:
"the salesblink link which was given in the file i was not able to signup ... so i was only able to make the feature which i saw in the video"

Challenge: Couldn’t integrate SalesBlink (signup failed).

Workaround: Built features based on demo video (assumed requirements).

🚀 Future Improvements
🌐 Deploy frontend to Vercel, backend to Render or Railway.

☁️ Integrate Cloudinary for email media attachments.

🧲 Connect real CRM or lead database for dynamic lead fetching.

🔐 Secure production environment variables and deploy pipeline.