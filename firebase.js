console.log("🔥 NEW FIREBASE FILE LOADED");
const firebaseConfig = {
apiKey: "AIzaSyCKdJaHy_FUSFbnUkTCm3p7p32sM1E5r7w",
  authDomain: "rhockstar-nation.firebaseapp.com",
  projectId: "rhockstar-nation",
  storageBucket: "rhockstar-nation.firebasestorage.app",
  messagingSenderId: "707658422879",
  appId: "1:707658422879:web:467e0785561454aca999ea"
};
alert("firebase connected");
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
