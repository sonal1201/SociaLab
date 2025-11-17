import express from "express"
import dotenv from "dotenv"
import v1Router from "./routers/v1Router";

const app = express()
dotenv.config();

const PORT = process.env.PORT || 3002

app.use(express.json());

app.use('/api/v1', v1Router)


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
