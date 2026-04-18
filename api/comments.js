export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Post ID required" });
  }

  try {
    const response = await fetch(`https://www.reddit.com/comments/${id}.json`, {
      headers: {
        "User-Agent": "reddit-search-app/1.0",
      },
    });

    const data = await response.json();

    const comments = data[1]?.data?.children || [];

    // recursive parser (IMPORTANT)
    const parseComment = (c) => {
      if (c.kind !== "t1") return null;

      return {
        id: c.data.id,
        author: c.data.author,
        body: c.data.body,
        upvotes: c.data.ups,
        replies: c.data.replies
          ? c.data.replies.data.children.map(parseComment).filter(Boolean)
          : [],
      };
    };

    const parsed = comments.map(parseComment).filter(Boolean).slice(0, 5); // limit

    res.status(200).json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
