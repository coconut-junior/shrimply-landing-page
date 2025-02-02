// deno-lint-ignore-file
import express from "express";

const app = express();
const PORT = 8000;

// Serve static assets first
app.use(express.static("dist")); // Serves all static files

// API route
app.get("/api/data", (req:any, res:any) => {
  res.json({ message: "Hello from Deno!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});