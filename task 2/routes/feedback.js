/**
 * Student Feedback API - Feedback Routes Handler
 * Defines endpoints for retrieving and creating student feedback records.
 * Path: routes/feedback.js
 */

const express = require('express');
const router = express.Router();

// 1. In-memory data store array (No database integration required)
// Initialized with the default sample record.
const feedbackList = [
  {
    id: 1,
    name: "Priyanshi",
    message: "Great platform"
  }
];

// Counter tracker for auto-incrementing ID primary keys.
// Initialized to 1 since we have one record predefined.
let currentId = 1;

/**
 * Validation Middleware
 * Checks if 'name' and 'message' fields are present in the request body,
 * are string types, and do not contain empty/whitespace-only content.
 * Returns a 400 Bad Request status code with JSON if validation fails.
 */
const validateFeedbackInput = (req, res, next) => {
  const { name, message } = req.body;

  // Check if fields exist
  if (name === undefined || message === undefined) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Both 'name' and 'message' fields are required in the request body."
    });
  }

  // Validate that 'name' is a non-empty string after trimming whitespace
  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({
      error: "Validation Error",
      message: "Name cannot be empty and must be a valid string."
    });
  }

  // Validate that 'message' is a non-empty string after trimming whitespace
  if (typeof message !== 'string' || message.trim() === '') {
    return res.status(400).json({
      error: "Validation Error",
      message: "Message cannot be empty and must be a valid string."
    });
  }

  // If validation passes, forward the request to the next handler
  next();
};

/**
 * @route   GET /feedback
 * @desc    Retrieve all student feedback records
 * @access  Public
 * @returns 200 OK - Array of feedback objects
 */
router.get('/', (req, res) => {
  // Returns HTTP status 200 OK along with the array of feedback
  res.status(200).json(feedbackList);
});

/**
 * @route   POST /feedback
 * @desc    Submit a new student feedback record
 * @access  Public
 * @returns 201 Created - The newly created feedback object
 *          400 Bad Request - If validation fails
 */
router.post('/', validateFeedbackInput, (req, res) => {
  const { name, message } = req.body;

  // Increment ID for auto-increment keys
  currentId += 1;

  // Instantiate the new feedback object
  const newFeedback = {
    id: currentId,
    name: name.trim(),
    message: message.trim()
  };

  // Push new feedback into the in-memory array database
  feedbackList.push(newFeedback);

  // Return HTTP status 201 Created along with the serialized object
  res.status(201).json(newFeedback);
});

module.exports = router;
