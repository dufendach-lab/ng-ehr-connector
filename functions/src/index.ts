/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
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

exports.userSearchByEmail = functions.https.onCall((data, _) => {
  // let userUID = "Didn't Update :(, Email is set";
  try {
    // const searchEmail = data.text;
    const user = admin.auth().getUserByEmail("admin@example.com");
    user.then((userRecord) => {
      if (userRecord) {
        // userUID = userRecord.uid;
        return userRecord.uid;
      } else {
        return "Entered the then, record did not exist";
      }
    });
        // .then((userRecord) => {
        //   if (userRecord) {
        //     userUID = userRecord.uid;
        //     return userUID;
        //   } else {
        //     return "Entered the then, record did not exist";
        //   }
        // });
    // return userUID;
    return "Function skipped over the function";
  } catch (err) {
    return err;
  }
});

exports.deleteUser = functions.https.onCall((data, _) => {
  admin.auth().deleteUser(data.text)
  .then(function() {
    console.log("Successfully deleted user");
    firestore().collection("patients").doc(data.text).delete();
  })
  .catch(function(error) {
    console.log("Error deleting user:", error);
  });
});
// // Exports app to firebase functions
// exports.app = functions.https.onRequest(app);

// export const helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });
