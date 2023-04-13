import app from "./app";
const PORT = process.env.PORT || 3000;
const MODE = process.env.NODE_ENV;

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${MODE}`);
});

