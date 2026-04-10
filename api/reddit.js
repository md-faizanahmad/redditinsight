const fetch = require("node-fetch");

module.exports = async (req, res) => {
  try {
    const response = await fetch("https://www.reddit.com/r/reactjs.json", {
      headers: {
        "User-Agent":
          "RedditExerciseApp/1.0 (by coldtruthvoice; devlensx@gmail.com)", // Replace with your details
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Reddit API error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch Reddit data. Please try again later." });
  }
};
