import * as firebase from 'firebase/app';
import 'firebase/firestore';

const app = firebase.initializeApp({
  apiKey: "AIzaSyAQ_F4rqan9FIXqrKoKwZVt1xZiFENCjSA",
    authDomain: "coder-shop.firebaseapp.com",
    databaseURL: "https://coder-shop.firebaseio.com",
    projectId: "coder-shop",
    storageBucket: "coder-shop.appspot.com",
    messagingSenderId: "843232993192",
    appId: "1:843232993192:web:5213ba2fa032e66f32079d"
});

export function getFirebase() {
  return app;
}

export function getFirestore() {
  return firebase.firestore(app);
}