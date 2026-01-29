const { default: axios } = require('axios');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Express Server!' });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});


// Temporary debug endpoint to verify outbound IP via NAT gateway
app.get("/debug/ip", async (req, res) => {
  try {
    const { data } = await axios.get("https://checkip.amazonaws.com");
    const ip = data.trim();
    console.log("Outbound IP:", ip);
    return res.json({ ip });
  } catch (error) {
    console.error("Failed to fetch outbound IP:", error);
    return res.status(500).json({ error: "Failed to get IP" });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
