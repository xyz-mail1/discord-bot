const fetch = require("node-fetch");

const token = process.env.nekosmoetoken;

if (!token) {
  throw new Error("Authorization token for nekosmoe is not defined.");
}

async function nekosmoe() {
  try {
    const res = await fetch("https://nekos.moe/api/v1/random/image", {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const json = await res.json();

      if (json.images && json.images.length > 0 && json.images[0].id) {
        return `https://nekos.moe/image/${json.images[0].id}.jpg`;
      } else {
        throw new Error("Unexpected response structure from NekosMoe.");
      }
    } else {
      throw new Error(
        `Failed to fetch image. Status: ${res.status}, Message: ${res.statusText}`
      );
    }
  } catch (error) {
    console.error("Error fetching image from NekosMoe:", error.message);

    console.error(error.stack);

    throw new Error(
      "An error occurred while fetching the image. Please try again later."
    );
  }
}

module.exports = { nekosmoe };
