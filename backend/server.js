require("dotenv").config();

const express = require("express");
const cors = require("cors");

const prisma = require("./config/prisma");

const app = express();

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const entryRoutes = require("./routes/entryRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");


const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://event-registration-platform-zeta.vercel.app",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/entry", entryRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/chatbot", chatbotRoutes);


app.get("/", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      success: true,
      message: "Database Connected Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});


process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});
