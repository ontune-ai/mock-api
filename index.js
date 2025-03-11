const express = require("express");
const app = express();
const port = 3333;

app.use(
  express.json({
    verify: (req, res, buf) => {
      try {
        JSON.parse(buf);
      } catch (e) {
        res.status(400).json({
          success: false,
          message: "Invalid JSON payload",
        });
        throw new Error("Invalid JSON");
      }
    },
  })
);

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use((req, res, next) => {
  try {
    if (req.body instanceof Buffer) {
      req.body = JSON.parse(req.body.toString());
    }
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid JSON payload",
      error: error.message,
    });
  }
});

// Get Appointment API
app.post("/api/appointment", (req, res) => {
  console.log("Fetching appointment details", req.body);
  res.json({
    success: true,
    appointment: {
      id: "12345",
      date: "2025-02-10",
      time: "10:00 AM",
      status: "confirmed",
    },
  });
});

// Book Appointment API
app.post("/api/book-appointment", (req, res) => {
  console.log("Booking new appointment", req.body);
  res.json({
    success: true,
    message: "Appointment booked successfully",
    appointmentId: "67890",
  });
});

// Book Appointment API
app.post("/api/events", (req, res) => {
  console.log("Event: ", req.body);
  res.json({
    success: true,
    message: "Event processed successfully",
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
