import {app, server} from "./app.js";
import { connectDB } from "./config/db.js";
import { startCronJobs, stopCronJobs } from "./services/cronJob.js";

const PORT = app.get('PORT');

async function startApp() {
  try {
    await connectDB();
    startCronJobs();
    server.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
    console.log("CORS Origin:", process.env.FRONTEND_URL);
  } catch (err) {
    stopCronJobs();
    console.error("💥 Shutdown: DB connection failed", err);
    process.exit(1);
  }
}

startApp();
