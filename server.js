const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

require('dotenv').config(); // Load variables from .env
const mongoose = require('mongoose');

// Use the variable from your .env file
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to DB!'))
  .catch(err => console.log(err));

// Schema
const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    gender: { type: String, required: true },
    beard: String,
    hijab: String,
    dob: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    languages: { type: String, required: true },
    religion: String,
    description: String,
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

// Route
app.post("/register", async (req, res) => {
    try {
        console.log("Incoming Data:", req.body);

        const user = new User(req.body);
        await user.save();

        res.status(201).json({ message: "User saved successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Start Server
app.listen(5001, () => {
    console.log("Server running on http://localhost:5001");
});
