export const handleAutomationData = async (req, res) => {
    try {
      const { leads, email, delay } = req.body;
  
      // Log the received data (for now)
      console.log("Received Automation Data:", { leads, email, delay });
  
      // Send a success response
      res.status(200).json({ message: "Data received successfully" });
    } catch (error) {
      console.error("Error processing automation data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  