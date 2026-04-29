const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();

// ---------------- MIDDLEWARE ----------------
app.use(cors());
app.use(express.json());

// ---------------- MONGODB CONNECTION ----------------
mongoose.connect("mongodb://127.0.0.1:27017/hrtcDB")
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.log("❌ MongoDB Error:", err));

// ---------------- ROOT ROUTE ----------------
app.get("/", (req, res) => {
    res.send("HRTC Backend Running 🚍");
});


// ==================================================
// 📌 CONTACT MODEL + API
// ==================================================
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    reason: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", contactSchema);

app.post("/contact", async (req, res) => {
    try {
        await new Contact(req.body).save();
        res.json({ success: true, message: "Contact saved" });
    } catch (err) {
        res.status(500).json({ success: false });
    }
});


// ==================================================
// 📌 HELP MODEL + API
// ==================================================
const helpSchema = new mongoose.Schema({
    name: String,
    email: String,
    issueType: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Help = mongoose.model("Help", helpSchema);

app.post("/help", async (req, res) => {
    try {
        await new Help(req.body).save();
        res.json({ success: true, message: "Help saved" });
    } catch (err) {
        res.status(500).json({ success: false });
    }
});


// ==================================================
// 📌 SIGNUP (SECURE PASSWORD HASHING)
// ==================================================
const signupSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    date: { type: Date, default: Date.now }
});

const Signup = mongoose.model("Signup", signupSchema);

app.post("/signup", async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        const userExists = await Signup.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new Signup({
            name,
            email,
            phone,
            password: hashedPassword
        });

        await user.save();

        res.json({ success: true, message: "Signup successful" });

    } catch (err) {
        res.status(500).json({ success: false });
    }
});


// ==================================================
// 📌 LOGIN (PASSWORD CHECK)
// ==================================================
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Signup.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({
                success: false,
                message: "Wrong password"
            });
        }

        res.json({
            success: true,
            message: "Login successful",
            user: user.name
        });

    } catch (err) {
        res.status(500).json({ success: false });
    }
});


// ==================================================
// 📌 BUS SEARCH API
// ==================================================
app.post("/api/buses", (req, res) => {
    const { from, to, date } = req.body;

    const buses = [
        {
            id: 1,
            name: "HRTC Volvo AC",
            from,
            to,
            date,
            time: "08:00 AM",
            price: 1200
        },
        {
            id: 2,
            name: "HRTC Deluxe",
            from,
            to,
            date,
            time: "01:30 PM",
            price: 800
        }
    ];

    res.json({ success: true, buses });
});


// ==================================================
// 📌 BOOKING API
// ==================================================
app.post("/api/book", (req, res) => {
    const { name, busName } = req.body;

    res.json({
        success: true,
        message: `Booking confirmed for ${name} on ${busName}`
    });
});


// ==================================================
// 📌 ADMIN PANEL APIs
// ==================================================
app.get("/admin/users", async (req, res) => {
    const users = await Signup.find();
    res.json(users);
});

app.get("/admin/contacts", async (req, res) => {
    const data = await Contact.find();
    res.json(data);
});

app.get("/admin/help", async (req, res) => {
    const data = await Help.find();
    res.json(data);
});


// ---------------- SERVER START ----------------
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});