// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  get,
  set,
  query,
  orderByChild,
  endAt,
  limitToLast,
} from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: "noodle-390216",
  storageBucket: "noodle-390216.appspot.com",
  messagingSenderId: "293031501671",
  appId: process.env.REACT_APP_FIREBASE_APPID,
  databaseURL: process.env.REACT_APP_DATABASEURL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//get an event
export const getSingleEvent = (eventID) => {
  const database = getDatabase();
  const singleEventRef = ref(database, "event/" + eventID);
  return get(singleEventRef).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  });
};

//submit a response to an existing event
export const submitPayload = (payload) => {
  console.log(payload); //this is going to be the entire event object, which sucks--figure out a way to only update the dates that have had updates
  const db = getDatabase();

  set(ref(db, "event/" + payload.eventUUID), {
    dates: payload.dates,
  });
};

//create a new event
export const submitNewEvent = (payload) => {
  const db = getDatabase();
  console.log(payload);
  set(ref(db, "event/" + payload.uuid), {
    eventname: payload.eventName,
    eventLocation: payload.eventLocation,
    hostName: payload.hostName,
    hostEmail: payload.hostEmail,
    dates: payload.eventDates,
    admin: payload.secretUuid,
  });
};

//retrieve the event via secret ID
export const getSingleAdminEvent = (eventID) => {
  const database = getDatabase();
  const dbRef = ref(database, "event");
  const queryRef = query(
    dbRef,
    orderByChild("admin"),
    endAt(eventID),
    limitToLast(1)
  );
  return get(queryRef).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  });
};
