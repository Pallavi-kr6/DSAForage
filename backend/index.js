import express from 'express';
import cors from 'cors';
import questionRoutes from "./routes/questions.js";
import progressRoutes from "./routes/progress.js";
import authRoutes from "./routes/auth.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/questions", questionRoutes);
app.use("/api/progress", progressRoutes);
app.use("/", authRoutes);

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})