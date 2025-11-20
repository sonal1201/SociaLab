import dotenv from "dotenv"
dotenv.config();

import express from "express"
import v1Router from "./routers/v1Router";
import cors from "cors"

const app = express()


const PORT = process.env.PORT || 3002

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use('/api/v1', v1Router)


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
