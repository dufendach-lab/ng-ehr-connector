/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable max-len */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {firestore} from "firebase-admin";

admin.initializeApp();

//  const db = admin.firestore();

// This is how many days to create the a reminder. 1000millisec * 60sec * 60min * 24hours * 14days
const REMINDER_OFFSET = 1000 * 60 * 60 * 24 * 14;

exports.schedulerReminder = functions.pubsub
    .schedule("every 24 hours")
    .onRun(() => {
      const curDate = new Date();
      const reminderDate = new Date(curDate.getTime() + REMINDER_OFFSET);
      const EDDtoSend = (reminderDate.toISOString().substr(0, 10));

      let number: string;

      admin.auth().listUsers().then((res) => {
        res.users.forEach((userRecord) => {
          try {
            const dbRef = firestore()
                .collection("patients").doc(userRecord.uid)
                .collection("gravidas").doc(EDDtoSend);
            dbRef.get().then((context) => {
              if (context.exists) {
                firestore()
                  .collection("patients")
                  .doc(userRecord.uid).get()
                  .then(async (doc) => {
                    number = await doc.data()?.phoneNum;
                    console.log("Sending message to: " + number);

                    firestore().collection("messages")
                      .doc()
                      .create({
                        channelId: "1dbe4caa9c2e43e48315c8f9b6416ecd",
                        type: "text",
                        content: {
                          text: "TEST TEST TEST TEST",
                        },
                        to: `${number.toString()}`,
                      });
                  });
              } else {
                // console.log("**Unviable user**");
                firestore().collection("reminder").doc(userRecord.uid).set({
                  reminderSentFor: EDDtoSend,
                  reminderSentOn: curDate,
                });
              }
            });
          } catch (error) {
            console.log(error);
          }
        });
      });
    });

// The function recieves a patients uID, which it then uses to delete the user
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
