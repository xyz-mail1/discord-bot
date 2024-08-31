const fetch = require("node-fetch");

/**
 * A class to interact with the PurrBot API for fetching SFW and NSFW images.
 */
class PurrBot {
  /**
   * Initializes the base URL for the PurrBot API.
   */
  constructor() {
    this.baseUrl = "https://purrbot.site/api/img";
  }

  /**
   * Fetches a SFW image or GIF from the PurrBot API.
   *
   * @param {"angry"|"background"|"bite"|"blush"|"comfy"|"cry"|"cuddle"|"dance"|"eevee"|"fluff"|"holo"|"hug"|"icon"|"kiss"|"kitsune"|"lay"|"lick"|"neko"|"okami"|"pat"|"poke"|"pout"|"senko"|"shiro"|"slap"|"smile"|"tail"|"tickle"} category - The SFW category of the image.
   * @returns {Promise<Object>} A promise that resolves to the image data or an error message.
   */
  async sfw(category) {
    return this.fetchImage("sfw", category);
  }

  /**
   * Fetches a NSFW image or GIF from the PurrBot API.
   *
   * @param {"anal"|"blowjob"|"cum"|"fuck"|"neko"|"pussylick"|"solo"|"solo_male"|"threesome_fff"|"threesome_ffm"|"threesome_mmf"|"yaoi"|"yuri"} category - The NSFW category of the image.
   * @returns {Promise<Object>} A promise that resolves to the image data or an error message.
   */
  async nsfw(category) {
    return this.fetchImage("nsfw", category);
  }

  /**
   * Internal method to fetch an image or GIF from the PurrBot API.
   *
   * @param {"sfw"|"nsfw"} type - The type of image, either "sfw" or "nsfw".
   * @param {string} category - The category of the image.
   * @returns {Promise<Object>} A promise that resolves to the image data or an error message.
   * @private
   */
  async fetchImage(type, category) {
    try {
      let res = await fetch(`${this.baseUrl}/${type}/${category}/gif`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      let data = await res.json();
      if (data.error) {
        // Retry with image if gif fails
        res = await fetch(`${this.baseUrl}/${type}/${category}/img`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        data = await res.json();
      }
      return data;
    } catch (error) {
      console.error(
        `Error fetching ${type.toUpperCase()} image: ${error.message}`
      );
      return { error: error.message };
    }
  }
}

// Export the class
module.exports = PurrBot;
