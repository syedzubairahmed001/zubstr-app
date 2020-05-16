import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDCmiKeETs8Q4bh_AJNr2QtC6msIZQ9VCE",
  authDomain: "zubstr-198ec.firebaseapp.com",
  databaseURL: "https://zubstr-198ec.firebaseio.com",
  projectId: "zubstr-198ec",
  storageBucket: "zubstr-198ec.appspot.com",
  messagingSenderId: "1036384675948",
  appId: "1:1036384675948:web:c0b541fef797c840031049",
  measurementId: "G-5CRHK0QMBW",
};
const f = firebase.initializeApp(config);
firebase.analytics();

export default f;
