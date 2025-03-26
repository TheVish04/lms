import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Make sure dotenv is configured
dotenv.config();

export const generateToken = (res, user, message) => {
  // Check if JWT_SECRET is defined
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not defined in environment variables");
    return res.status(500).json({
      success: false,
      message: "Server configuration error"
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: parseInt(process.env.COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      photoUrl: user.photoUrl,
      enrolledCourses: user.enrolledCourses,
    },
  });
};
