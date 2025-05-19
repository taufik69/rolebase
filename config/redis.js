// config/redis.js
const redis = require("redis");

const client = redis.createClient(); // default localhost:6379

client.connect();

client.on("connect", () => {
  console.log("✅ Redis connected");
});

client.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});

module.exports = client;
