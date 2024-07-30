
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAolJVUFpfZ1UUIYQJ6aqGlQPlxra27B2M",
    authDomain: "indigoflightstatus-21520.firebaseapp.com",
    projectId: "indigoflightstatus-21520",
    storageBucket: "indigoflightstatus-21520.appspot.com",
    messagingSenderId: "173996047586",
    appId: "1:173996047586:web:55bb98b3aa5ee7129572bb",
    measurementId: "G-45TG28ZRV1"
  };

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

export { app, messaging };
