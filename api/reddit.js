import { Redis } from "@upstash/redis";

// Initialize Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Rate limit config
const RATE_LIMIT_WINDOW = 10; // seconds
const RATE_LIMIT_MAX = 20;

export default async function handler(req, res) {
  const { q, after } = req.query;

  // 🔥 Detect mode
  const isTrending = !q;

  // -----------------------------
  // 🔒 RATE LIMITING
  // -----------------------------
  const ip =
    req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || "unknown";

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
  // ✅ VALIDATION (ONLY for search)
  // -----------------------------
  let safeQuery = null;

  if (!isTrending) {
    if (typeof q !== "string") {
      return res.status(400).json({ error: "Invalid query" });
    }

    safeQuery = q.trim().toLowerCase();

    if (safeQuery.length < 2 || safeQuery.length > 50) {
      return res.status(400).json({ error: "Invalid query length" });
    }
  }

  // -----------------------------
  // ⚡ CACHE KEY
  // -----------------------------
  const cacheKey = isTrending
    ? "trending"
    : `search:${safeQuery}:${after || "first"}`;

  const cached = await redis.get(cacheKey);

  if (cached) {
    return res.status(200).json(cached);
  }

  try {
    // -----------------------------
    // 🌐 BUILD URL
    // -----------------------------
    let url;

    if (isTrending) {
      url = "https://www.reddit.com/r/popular.json";
    } else {
      url = `https://www.reddit.com/search.json?q=${encodeURIComponent(
        safeQuery,
      )}${after ? `&after=${after}` : ""}`;
    }

    // -----------------------------
    // ⏱ TIMEOUT
    // -----------------------------
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, {
      headers: {
        "User-Agent": "web:reddit-insight:v1.0 (by /u/coldtruthvoice)",
        Accept: "application/json",
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
    const TTL = isTrending ? 30 : after ? 5 : 15;

    await redis.set(cacheKey, data, { ex: TTL });

    // -----------------------------
    // 🌐 RESPONSE
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
