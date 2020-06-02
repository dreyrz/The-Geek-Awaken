import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyDGRo75tQMWf0po-KzdbCgInS4p-N6_fAE",
    authDomain: "thegeekawaken-2a549.firebaseapp.com",
    databaseURL: "https://thegeekawaken-2a549.firebaseio.com",
    projectId: "thegeekawaken-2a549",
    storageBucket: "thegeekawaken-2a549.appspot.com",
    messagingSenderId: "432896376400",
    appId: "1:432896376400:web:baaccc246c8f4e3b6cdb55"
  };

firebase.initializeApp(firebaseConfig);
export default firebase;
