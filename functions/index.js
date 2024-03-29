const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const app = express();

app.use(cors());

app.get("/firebase", (req, res) => {
    res.send("Hooray, it works! 🔥🔥");
});

exports.app = functions.https.onRequest(app);
