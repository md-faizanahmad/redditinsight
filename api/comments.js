export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Post ID required" });
  }

  try {
    const url = `https://www.reddit.com/comments/${id}.json`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "reddit-search-app/1.0",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }

    const data = await response.json();

    // comments are in second array
    const comments = data[1]?.data?.children || [];

    // take top 5 only
    const topComments = comments
      .filter((c) => c.kind === "t1")
      .slice(0, 5)
      .map((c) => ({
        id: c.data.id,
        author: c.data.author,
        body: c.data.body,
        upvotes: c.data.ups,
      }));

    res.status(200).json(topComments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
