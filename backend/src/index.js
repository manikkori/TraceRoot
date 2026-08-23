import express from "express";
import cors from "cors";
import "dotenv/config";
import investigateRoute from "./routes/investigate.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/investigate", investigateRoute);

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "TraceRoot Backend is running smoothly." });
});

app.listen(PORT, () => {
  console.log(
    `🚀 TraceRoot Backend Engine started on http://localhost:${PORT}`,
  );
});
