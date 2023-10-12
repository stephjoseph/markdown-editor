import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBS7PatJh_FvAI28IxN48KyqBALEsNbO_0',
  authDomain: 'markdown-editor-3c7e2.firebaseapp.com',
  projectId: 'markdown-editor-3c7e2',
  storageBucket: 'markdown-editor-3c7e2.appspot.com',
  messagingSenderId: '472474678969',
  appId: '1:472474678969:web:0653c8ef48ebdb36938d68',
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init firestore service
const projectFirestore = firebase.firestore();
const timestamp =  firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, timestamp };
