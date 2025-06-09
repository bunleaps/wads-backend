import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";

// Load env
dotenv.config();

// Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ticket MERN API",
      version: "1.0.0",
      description: "API documentation for the Ticket MERN application",
    },
    servers: [
      {
        url: "https://wads-backend.vercel.app",
        description: "Production server",
      },
      {
        url: `http://localhost:${PORT}`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware
const corsOptions = {
  origin: "https://wads-frontend-pi.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));

// Serve Swagger UI static files
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css",
  customJs: [
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-bundle.js",
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-standalone-preset.js"
  ]
}));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "ticketmern",
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// GET "/" route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the TICKET API" });
});

// Use auth routes
app.use("/api/auth", authRoutes);

// Use admin routes
app.use("/api/admin", adminRoutes);

// Use tickets routes
app.use("/api/purchases", purchaseRoutes);
app.use("/api/tickets", ticketRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
