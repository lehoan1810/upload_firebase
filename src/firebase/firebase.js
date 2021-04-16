import firebase from 'firebase/app'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyBG8Iv4sdPPG3-fUtS7RjxsMioKfVCPj7w",
    authDomain: "image-2ea57.firebaseapp.com",
    projectId: "image-2ea57",
    storageBucket: "image-2ea57.appspot.com",
    messagingSenderId: "625058814796",
    appId: "1:625058814796:web:7feb79d3ccbfe9dc4a4de9"
  };

  
export const fb = firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage()


 
 