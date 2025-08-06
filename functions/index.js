/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.validateAccess = onRequest(
  {cors: true},
  (request, response) => {
    if (request.body?.accessKey === "ndibmcalc2025!") {
      logger.info("Access granted");
      response.status(200).send("Access granted");
    } else {
      logger.warn("Access denied");
      response.status(403).send("Access denied");
    }
});
