const fetch = require("node-fetch");

async function getNekosApi() {
  try {
    const res = await fetch(
      "https://api.nekosapi.com/v3/images/random?limit=1&rating=explicit&tag=8",
      { method: "GET" }
    );

    if (res.ok) {
      // Using .ok for a more readable check for status codes in the range 200-299
      const data = await res.json();

      // Check if the expected structure exists in the response
      if (data.items && data.items.length > 0 && data.items[0].image_url) {
        return data.items[0].image_url;
      } else {
        throw new Error("Unexpected response structure from nekosapi.");
      }
    } else {
      throw new Error(
        `Failed to fetch image. Status: ${res.status}, Message: ${res.statusText}`
      );
    }
  } catch (error) {
    // Log the detailed error information
    console.error("Error fetching image from NekosAPI:", error.message);
    // Optionally include the full error stack for debugging
    console.error(error.stack);

    // Rethrow with a user-friendly message
    throw new Error(
      "An error occurred while fetching the image. Please try again later."
    );
  }
}

module.exports = { getNekosApi };
