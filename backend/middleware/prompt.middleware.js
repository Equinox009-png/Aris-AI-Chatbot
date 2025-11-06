import jwt from "jsonwebtoken";
import config from "../config.js";

export const promptMiddleware = (req, res, next) => {
  try {
    // 1. Get token from cookie
    const token = req.cookies?.jwt;
    if (!token) {
      return res.status(401).json({ success: false, message: "No authentication token found" });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, config.JWT_USER_PASSWORD);

    // 3. Attach only user id
    req.user = decoded.id;

    next();
  } catch (error) {
    console.error("Prompt Middleware Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired, please login again" });
    }

    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
export default promptMiddleware;