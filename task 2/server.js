/**
 * Student Feedback API - Server Entry Point
 * Sets up Express app config, middlewares, routing mounts, and error handlers.
 * Path: server.js
 */

const express = require('express');
const feedbackRouter = require('./routes/feedback');

// Initialize Express Application
const app = express();

// Set up server port (reads environment variable or defaults to 3000)
const PORT = process.env.PORT || 3000;

// ==========================================
// 1. Built-in Middleware
// ==========================================
// Parses incoming requests with JSON payloads.
// Enables reading req.body as a JavaScript object.
app.use(express.json());

// ==========================================
// 2. Custom Logger Middleware
// ==========================================
// Logs incoming HTTP request methods, URLs, and timestamps to the console.
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} request received at ${req.url}`);
  next(); // Forward execution to the next middleware or route handler
});

// ==========================================
// 3. Routing Layer
// ==========================================
// Mounts the feedback router on the '/feedback' namespace path.
app.use('/feedback', feedbackRouter);

// Base root endpoint handler (friendly verification page)
app.get('/', (req, res) => {
  res.status(200).json({
    message: "Welcome to the Student Feedback API!",
    version: "1.0.0",
    endpoints: {
      getAllFeedback: "GET /feedback",
      createFeedback: "POST /feedback"
    }
  });
});

// ==========================================
// 4. 404 Not Found Middleware
// ==========================================
// Catches all requests that do not match any defined endpoints above.
app.use((req, res, next) => {
  res.status(404).json({
    error: "Not Found",
    message: `Cannot find path '${req.method} ${req.originalUrl}' on this server.`
  });
});

// ==========================================
// 5. Global Error Handling Middleware
// ==========================================
// Catches and logs all unhandled exceptions generated in routes or middleware.
// Prevents server crashes and returns a standard 500 status code response.
app.use((err, req, res, next) => {
  console.error("Unhandled Server Exception:", err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: "An unexpected error occurred on our server. Please try again later."
  });
});

// ==========================================
// 6. Server Initialization
// ==========================================
// Binds and listens for connections on the specified port.
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 Student Feedback API Server is active!`);
  console.log(`👉 Running on port: http://localhost:${PORT}`);
  console.log(`==================================================`);
});

module.exports = app; // Export for testing/verification purposes
