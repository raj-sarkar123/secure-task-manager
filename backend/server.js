require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");
const connectDB = require("./config/db");

// Connect Database
connectDB();

const app = express();

// CORS Configuration

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Init Middleware
app.use(express.json());

// Morgan Logging
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// Test route
app.get("/", (req, res) => res.send("API Running"));

// Swagger
const swaggerDocument = YAML.load(
  path.join(__dirname, "docs", "swagger.yaml")
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/tasks", require("./routes/taskRoutes"));

// Error Middleware
app.use(require("./middleware/errorMiddleware"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));