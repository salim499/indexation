import firebase from 'firebase'
import 'firebase/firestore'

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBRdMF8d3X2Mrw1No9orSK1Q-Qjr32MIUI",
    authDomain: "indexation3-c7320.firebaseapp.com",
    projectId: "indexation3-c7320",
    storageBucket: "indexation3-c7320.appspot.com",
    messagingSenderId: "942215022981",
    appId: "1:942215022981:web:0ebb6a21d24beadaf8dcec",
    measurementId: "G-4LBYCBS3K9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


  export default firebase

/*
import firebase from 'firebase'
import 'firebase/firestore'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCzMXpmYz7I-593i69Y9pX38hTfxg48tLk",
    authDomain: "indexation2-35fd2.firebaseapp.com",
    projectId: "indexation2-35fd2",
    storageBucket: "indexation2-35fd2.appspot.com",
    messagingSenderId: "740566763997",
    appId: "1:740566763997:web:e44070b10ca6d1af678e34"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  export default firebase
*/