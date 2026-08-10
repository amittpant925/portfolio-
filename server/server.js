const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

try {
    const dns = require("dns");
    if (typeof dns.setServers === "function") {
        dns.setServers(["8.8.8.8", "1.1.1.1"]);
    }
} catch (e) {}

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use(async (req, res, next) => {
    if (req.path.startsWith("/api")) {
        await connectDB();
    }
    next();
});

const projectRoutes = require("./routes/projectRoutes");
const contactRoutes = require("./routes/contactRoutes");

app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date() });
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

const PORT = process.env.PORT || 5000;
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;