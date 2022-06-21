import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'


const firebaseConfig = {
    apiKey: "AIzaSyCRWmSONYW6s4YArw5QZko2zc9Nuav3mTk",
    authDomain: "test-raizzen-e851b.firebaseapp.com",
    databaseURL: "https://test-raizzen-e851b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "test-raizzen-e851b",
    storageBucket: "test-raizzen-e851b.appspot.com",
    messagingSenderId: "554612732365",
    appId: "1:554612732365:web:318e9a662d383da7a8d484",
    measurementId: "G-M1HLQMSRJD"
};



export default function initFirebase() {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
    } else {
        console.log('Firebase has already been initialized');
    }

}