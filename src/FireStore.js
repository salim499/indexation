import firebase from 'firebase'
import 'firebase/firestore'

    // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBl5aTCLuGALnFRIP-sJVAExouVzQhBXuY",
    authDomain: "indexation-e5027.firebaseapp.com",
   // databaseURL: "https://indexation-e5027.firebaseio.com",
    projectId: "indexation-e5027",
    storageBucket: "indexation-e5027.appspot.com",
    messagingSenderId: "1031482024712",
    appId: "1:1031482024712:web:4edb44e7c8121d6d18c2bd",
    measurementId: "G-QL0C58WGZ9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


  export default firebase