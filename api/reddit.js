export default async function handler(req, res) {
  const { q, after } = req.query;

  try {
    const url = `https://www.reddit.com/search.json?q=${q}${
      after ? `&after=${after}` : ""
    }`;

    const response = await fetch(url);
    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Reddit data" });
  }
}
