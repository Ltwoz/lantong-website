const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./utils/db");

const app = express();
const PORT = process.env.PORT || 8000;

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

const corsOptions = {
    // origin: "http://localhost:3000",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

// Config
dotenv.config({ path: ".env.local" });

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors(corsOptions));

connectDB().then(() => {
    // routes
    const routes = require("./routes");
    routes(app);

    const server = app.listen(PORT, () => {
        console.log(`Server is working on port : ${PORT}`);
    });

    // Unhandled Promise Rejection
    process.on("unhandledRejection", (err) => {
        console.log(`Error: ${err.message}`);
        console.log(
            `Shutting down the server due to Unhandled Promise Rejection`
        );
        server.close(() => {
            process.exit(1);
        });
    });
});
