const moment = require('moment');

// --- CONCEPTUAL IN-MEMORY DATABASE (REPLACE WITH REAL DB) ---
const shortUrls = []; // This array will store our URL data

/**
 * Data structure for each short URL entry:
 * {
 * originalUrl: "https://very-very-long...",
 * shortcode: "abcd1",
 * creationDate: "2025-07-04T12:00:00Z",
 * expiry: "2025-07-04T12:30:00Z",
 * clicks: [
 * {
 * timestamp: "2025-07-04T12:01:00Z",
 * ipAddress: "192.168.1.1",
 * referrer: "https://example.com"
 * },
 * // ... more clicks
 * ]
 * }
 */
// -------------------------------------------------------------


/**
 * Creates a new short URL entry in the database.
 * @param {object} data - The short URL data.
 * @returns {Promise<object>} The created short URL object.
 */
async function createShortUrl(data) {
    // In a real DB, this would be an insert operation
    shortUrls.push(data);
    console.log('Short URL created (in-memory):', data);
    return data;
}

/**
 * Finds a short URL by its shortcode.
 * @param {string} shortcode - The shortcode to find.
 * @returns {Promise<object|null>} The found short URL object or null if not found.
 */
async function findShortUrlByShortcode(shortcode) {
    // In a real DB, this would be a findOne operation
    const url = shortUrls.find(url => url.shortcode === shortcode);
    return url || null;
}

/**
 * Records a click for a given shortcode.
 * @param {string} shortcode - The shortcode that was clicked.
 * @param {string} ipAddress - The IP address of the clicker.
 * @param {string} referrer - The HTTP referrer.
 */
async function recordClick(shortcode, ipAddress, referrer) {
    const url = await findShortUrlByShortcode(shortcode);
    if (url) {
        url.clicks.push({
            timestamp: moment().toISOString(),
            ipAddress: ipAddress,
            referrer: referrer
        });
        console.log(`Click recorded for shortcode '${shortcode}' (in-memory).`);
    }
}

module.exports = {
    createShortUrl,
    findShortUrlByShortcode,
    recordClick
};