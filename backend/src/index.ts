import dotenv from "dotenv"
dotenv.config();

import express from "express"
import v1Router from "./routers/v1Router";
import cors from "cors"

const app = express();
const PORT = process.env.PORT || 3002;

const allowedOrigins = [
    "http://localhost:5173",
    "https://socialogy.vercel.app",
    "http://socialogy.vercel.app"
];

app.use(express.json());

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); 
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
}));


app.get("/ping", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Pong! Server is alive.",
        time: new Date().toISOString()
    });
});

app.use('/api/v1', v1Router);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
