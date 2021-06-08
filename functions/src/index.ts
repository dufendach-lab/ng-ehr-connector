import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

export const messageScheduler = functions.pubsub
.schedule('0 9 * * *').onRun(context => { // Cron schedule format
  console.log("This will be run every day at 9AM.");
});

// // Create Patient
// app.post("/api/create", (req, res) => {
//   (async ()=> {
//     try {
//       await db.collection("patients").doc()
//           .create({
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             MotherDoB: admin.firestore.Timestamp.fromDate(new Date()),
//             EstDueDate: admin.firestore.Timestamp.fromDate(new Date()),
//             Diagnosis: req.body.Diagnosis,
//             hospital: req.body.hospital,
//           });

//       return res.status(200).send();
//     } catch (error) {
//       console.log(error);
//       return res.status(500).send();
//     }
//   })();
// });

// // SEND A MESSAGE
// app.post("/api/create/message", async (req, res) => {
//   try {
//     await db.collection("messages").doc()
//       .create({
//         originator: ,
//         recipients: [],
//         body: "If you/re reading this it/s too late. Goodbye.",
//       });
//       return res.status(200).send();
//   } catch (error) {
//     functions.logger.log(error);
//     return res.status(500).send(error);
//   }
// });

// Read Patient
// app.get("/api/read/:id", (req, res) => {
//   (async ()=> {
//     try {
//       const document = db.collection("patients").doc(req.param.id);
//       const patient = await document.get();
//       const response = patient.data();

//       return res.status(200).send(response);
//     } catch (error) {
//       console.log(error);
//       return res.status(500).send(error);
//     }
//   })();
// });


// // Exports app to firebase functions
// exports.app = functions.https.onRequest(app);

// export const helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });


