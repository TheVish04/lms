import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";

dotenv.config({});

// Initialize database connection before starting server
const startServer = async () => {
  try {
    await connectDB();
    
    // Validate essential environment variables
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET must be defined in environment variables');
    }

    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(express.json());
    app.use(cookieParser());

    app.use(cors({
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true
    }));

    // Routes
    app.use("/api/v1/media", mediaRoute);
    app.use("/api/v1/user", userRoute);
    app.use("/api/v1/course", courseRoute);
    app.use("/api/v1/purchase", purchaseRoute);
    app.use("/api/v1/progress", courseProgressRoute);

    // Global error handler
    app.use((err, req, res, next) => {
      console.error(`Error: ${err.message}`);
      res.status(500).json({
        success: false,
        message: err.message || 'Internal server error'
      });
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();


