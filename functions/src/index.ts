/* eslint-disable @typescript-eslint/no-var-requires */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {firestore} from "firebase-admin";

// eslint-disable-next-line max-len
// const serviceAccount = require("/Users/calr5u/Projects/FHIR-APP/functions/serviceAccountKey.json");
admin.initializeApp(
    // {
    //   credential: admin.credential.cert(serviceAccount),
    // }
);

//  const db = admin.firestore();

const REMINDER_OFFSET = 1000 * 60 * 60 * 24 * 14;

exports.schedulerReminder = functions.pubsub
    .schedule("every 24 hours")
    .onRun(() => {
      const curDate = new Date();
      const reminderDate = new Date(curDate.getTime() + REMINDER_OFFSET);
      const EDDtoSend = (reminderDate.toISOString().substr(0, 10));

      admin.auth().listUsers().then((res) => {
        res.users.forEach((userRecord) => {
          try {
            const dbRef = firestore()
                .collection("patients").doc(userRecord.uid)
                .collection("gravidas").doc(EDDtoSend);
            dbRef.get().then((context) => {
              if (context.exists) {
                firestore().collection("reminder").doc(userRecord.uid).set({
                  reminderSentFor: EDDtoSend,
                  reminderSentOn: curDate,
                });
                // response.send(context.data());
              } else {
                // response.send("Loop not working");
              }
            });
          } catch (error) {
            console.log(error);
          }
        });
      });
      // response.send(EDDtoSend);
    });

exports.adminSetUp = functions.https.onRequest((_, response) => {
  admin.auth()
      .createCustomToken("OEzhiCyMEFb3AECvlEWhGBAnkii1", {superAdmin: true})
      .then((customToken) => {
        response.send(customToken);
      })
      .catch((err) => {
        response.send(err);
      });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.userSearchByEmail = functions.https.onCall((data, context) => {
  try {
    const searchEmail = data.text;
    let userUID = "Didn't Update :(";
    admin.auth().getUserByEmail(searchEmail).then((userRecord) => {
      userUID = userRecord.uid;
    });
    return userUID;
  } catch (err) {
    return err;
  }
});
// // Exports app to firebase functions
// exports.app = functions.https.onRequest(app);

// export const helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });
