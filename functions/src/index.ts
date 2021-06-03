import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";

const serviceAccount = require("../permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: "ehr-connector",
});

const db = admin.firestore();
const app = express();
app.use(cors({origin: true}));

// Routes
app.get("/hello-world", (req, res) => {
  return res.status(200).send("Hello World");
});

// Create Patient
app.post("/api/create", (req, res) => {
  (async ()=> {
    try {
      await db.collection("patients").doc()
          .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            MotherDoB: admin.firestore.Timestamp.fromDate(new Date()),
            EstDueDate: admin.firestore.Timestamp.fromDate(new Date()),
            Diagnosis: req.body.Diagnosis,
            hospital: req.body.hospital,
          });

      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send();
    }
  })();
});

// Read Patient
app.get("/api/read/:id", (req, res) => {
  (async ()=> {
    try {
      const document = db.collection("patients").doc(req.params.id);
      const patient = await document.get();
      const response = patient.data();

      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send();
    }
  })();
});


// Exports apo to firebase functions
exports.app = functions.https.onRequest(app);

// export const testTest = functions.https.onRequest(async (req, res) => {
//   functions.logger.log("Message Received.");
//   const val = await req.body.data;
//   res.send(val);
//   functions.logger.log("Message sent back.");
// });

// export const helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });


