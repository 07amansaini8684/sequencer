export const authCallback = async (req, res) => {
    try {
      const {id, firstName, lastName, email, imageUrl} = req.body;
  
      // check if user already exists
      const user = await User.findOne({ clerkId: id });
  
      if(!user) {
        const newUser = new User({
          clerkId: id,
          email,
          fullName: `${firstName} ${lastName}`,
          imageUrl
        });
        await newUser.save();
      }
      // Send a success response 
      res.status(200).json({ message: "User data saved successfully" ,success: true});
  
  
  
    } catch (error) {
      console.error("Error in callback:", error);
      res.status(500).json({ message: "Internal Server Error" , error: error.message });
    }
  }