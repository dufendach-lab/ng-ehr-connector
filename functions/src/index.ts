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

// CREATE NEW USER
exports.createUser = functions.https.onCall(async (data, context) => {
  try {
    admin.auth().createUser({
      email: data.authStuff.email,
      emailVerified: true,
      phoneNumber: data.authStuff.phoneNumber,
      password: data.authStuff.password,
    }).then((userRecord) => {
      firestore().collection("patients").doc(userRecord.uid).create(data.newPat);
      console.log("Succesfully created new user: ", userRecord.uid);
    });
  } catch (e) {
    console.log("Error creating new user: ", e);
  }
});

// RETRIEVE USER DATA
exports.getOneUser = functions.https.onCall(async (data, context) => {
  try {
    admin.auth().getUser(data.uid).then((userRecord) => {
      console.log("Succesfully fetched user data: ", userRecord.toJSON());
    });
  } catch (e) {
    console.log("Error fetching user data: ", e);
  }
});

// UPDATE A USER
exports.updateUser = functions.https.onCall(async (data, context) => {
  try {
    admin.auth().updateUser(data.uid, {
      email: data.email,
      emailVerified: true,
      phoneNumber: data.phoneNumber,
      password: data.password,
    }).then((userRecord) => {
      console.log("Succesfully update user: ", userRecord.toJSON());
    });
  } catch (e) {
    console.log("Error updating user: ", e);
  }
});

// DELETE A USER
exports.deleteUser = functions.https.onCall(async (data, context) => {
  try {
    admin.auth().deleteUser(data.uid).then(() => {
      console.log("Succesfully deleted user.");
    });
  } catch (e) {
    console.log("Error deleting user: ", e);
  }
});

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

                    await firestore().collection("messages")
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
                }).then(() => {
                  console.log("Reminder set.");
                });
              }
            });
          } catch (error) {
            console.log(error);
          }
        });
      });
    });
