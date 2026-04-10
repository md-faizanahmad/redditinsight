export default async function handler(req, res) {
  const { q, after } = req.query;

  if (!q || q.trim() === "") {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(q)}${
      after ? `&after=${after}` : ""
    }`;

    const response = await fetch(url); // ✅ native fetch

    if (!response.ok) {
      throw new Error(`Reddit API failed: ${response.status}`);
    }

    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (error) {
    console.error("API ERROR:", error);

    res.status(500).json({
      error: "Failed to fetch Reddit data",
      details: error.message,
    });
  }
}
