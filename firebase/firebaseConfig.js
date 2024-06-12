import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use

// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDL0pWPqxSAH6sj9KXrnSItpaDkenqQzRU',
  authDomain: 'fbasepasswordauthapp.firebaseapp.com',
  databaseURL: 'https://project-id.firebaseio.com',
  projectId: 'fbasepasswordauthapp',
  storageBucket: 'fbasepasswordauthapp.appspot.com',
  messagingSenderId: '699719160644',
  appId: '1:699719160644:android:c7eb7e5adeae2943f7bd11',
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
