import { Redis } from "@upstash/redis";

// Initialize Redis using env variables
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Rate limit config
const RATE_LIMIT_WINDOW = 10; // seconds
const RATE_LIMIT_MAX = 20; // max requests per IP per window

export default async function handler(req, res) {
  const { q, after } = req.query;

  // Get client IP (important for rate limiting)
  const ip =
    req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || "unknown";

  // -----------------------------
  // 🔒 RATE LIMITING (Redis)
  // -----------------------------
  const rateKey = `rate:${ip}`;

  const current = await redis.get(rateKey);

  if (current && Number(current) >= RATE_LIMIT_MAX) {
    return res.status(429).json({ error: "Too many requests" });
  }

  await redis.incr(rateKey);

  if (!current) {
    await redis.expire(rateKey, RATE_LIMIT_WINDOW);
  }

  // -----------------------------
  // ✅ VALIDATION
  // -----------------------------
  if (!q || typeof q !== "string") {
    return res.status(400).json({ error: "Query is required" });
  }

  const safeQuery = q.trim().toLowerCase();

  if (safeQuery.length < 2 || safeQuery.length > 50) {
    return res.status(400).json({ error: "Invalid query length" });
  }

  // -----------------------------
  // ⚡ CACHE KEY
  // -----------------------------
  const cacheKey = `search:${safeQuery}:${after || "first"}`;

  // Check Redis cache
  const cached = await redis.get(cacheKey);

  if (cached) {
    return res.status(200).json(cached);
  }

  try {
    // Build Reddit URL
    const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(
      safeQuery,
    )}${after ? `&after=${after}` : ""}`;

    // -----------------------------
    // ⏱ TIMEOUT PROTECTION
    // -----------------------------
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, {
      headers: {
        "User-Agent": "reddit-search-app/1.0",
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Reddit API failed: ${response.status}`);
    }

    const data = await response.json();

    // -----------------------------
    // 💾 CACHE STORE
    // -----------------------------
    const TTL = after ? 5 : 15; // shorter for pagination

    await redis.set(cacheKey, data, { ex: TTL });

    // -----------------------------
    // 🌐 CORS
    // -----------------------------
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.status(200).json(data);
  } catch (error) {
    if (error.name === "AbortError") {
      return res.status(504).json({ error: "Request timeout" });
    }

    console.error("API ERROR:", error);

    res.status(500).json({
      error: "Failed to fetch Reddit data",
    });
  }
}
