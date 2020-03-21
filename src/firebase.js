import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAZCEa01dZLr4Wjih6sfKcoYj__lCvRk_U",
    authDomain: "tbbt-df76e.firebaseapp.com",
    databaseURL: "https://tbbt-df76e.firebaseio.com",
    projectId: "tbbt-df76e",
    storageBucket: "tbbt-df76e.appspot.com",
    messagingSenderId: "874943846037",
    appId: "1:874943846037:web:bda4383af951a467476d9c",
    measurementId: "G-BB3YCVN8EB"
  };
  
  firebase.initializeApp(firebaseConfig);
  var database = firebase.firestore();
  export default database;