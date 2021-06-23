import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {firestore} from "firebase-admin";

admin.initializeApp();

//  const db = admin.firestore();

const REMINDER_OFFSET = 1000 * 60 * 60 * 24 * 14;

// exports.schedulerReminder = functions.https.onRequest(() => {

// })

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
            const phone = firestore()
                .collection("patients")
                .doc(userRecord.uid).get();
            dbRef.get().then((context) => {
              if (context.exists) {
                firestore().collection("messages")
                .doc()
                .create({
                  channelId: "1dbe4caa9c2e43e48315c8f9b6416ecd",
                  type: "text",
                  content: {
                    text: "TEST TEST TEST TEST",
                  },
                  to: `${phone.phoneNum}`
                })
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

// // Exports app to firebase functions
// exports.app = functions.https.onRequest(app);

// export const helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });
