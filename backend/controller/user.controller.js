import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config.js";
export const signup=async(req,res)=>{
  
  //console.log("Signup Function....");
  const{firstName,lastName,email,password}=req.body;
  try{
    const user=await User.findOne({email:email})
    if(user){
      return res.status(401).json({message:"User already exists"})
    }
    const hashPassword = await bcrypt.hash(password,10);
    const newuser=new User({firstName,lastName,email,password:hashPassword})
    await newuser.save();
    
    
    return res.status(201).json({message:"User created successfully"})
  }catch(error){
    console.log("Error occurred during signup:", error)
    return res.status(500).json({message:"Internal Server Error"})
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user by email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    //jwt code
    const token = jwt.sign({ id: user._id }, config.JWT_USER_PASSWORD, { expiresIn: '1d' });
    res.cookie("jwt",token);
    const cookieOptions = {
      expiresIn: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ,
      sameSite: "Strict"
    };
    res.cookie("jwt", token, cookieOptions);

    // 2. Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Success
    return res.status(200).json({ message: "Login successful", user, token });

  } catch (error) {
    console.error("Error occurred during login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout=(req,res)=>{
try{
  res.clearCookie("jwt");
  return res.status(200).json({ message: "Logout successful" });

}catch(error){
  console.log("Error occurred during logout:", error);
  return res.status(500).json({ message: "Error in logout" });
}
};
