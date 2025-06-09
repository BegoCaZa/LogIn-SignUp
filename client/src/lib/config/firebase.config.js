// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAmnNzlKMsBCvQVfNsLHSOQbLemtBnwwRc',
	authDomain: 'chat-with-login-d8a01.firebaseapp.com',
	projectId: 'chat-with-login-d8a01',
	storageBucket: 'chat-with-login-d8a01.firebasestorage.app',
	messagingSenderId: '920974275581',
	appId: '1:920974275581:web:82bafe6406b89502c6df94'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
