import { initializeApp } from "firebase/app";
// import { createProfile } from "./src/features/leadData/leadDataReducer";
// import { doc, getDoc } from "firebase/firestore";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  EmailAuthProvider,
  reauthenticateWithCredential

} from "firebase/auth";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyCNo9ogRf1OfHnv2WmOfcWF5tbVVoEl_7k",
//   authDomain: "athlead-e99b5.firebaseapp.com",
//   projectId: "athlead-e99b5",
//   storageBucket: "athlead-e99b5.appspot.com",
//   messagingSenderId: "309170576748",
//   appId: "1:309170576748:web:906a3f68efd541c0356749",
//   measurementId: "G-DBV3L9VYMT",
// };
const firebaseConfig = {
    apiKey: "AIzaSyC_v_wo9p3AqP-61DVF8zCGwWmqOe70Gww",
    authDomain: "flight-project-freelance.firebaseapp.com",
    projectId: "flight-project-freelance",
    storageBucket: "flight-project-freelance.appspot.com",
    messagingSenderId: "490171233304",
    appId: "1:490171233304:web:67a04564e0560372043f6d"
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
// const history = useHistory();

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    // console.log(user);
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
      const profileData = {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        password: null,
      };
      // Uncomment and call the createProfile function to create the profile in Firestore.
      // await createProfile(profileData);
      return { data: profileData, newUser: true };
    } else {
      // Existing user, return the existing user data.
      const existingUserData = user;
      return { data: existingUserData, newUser: false };
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const fetchUsers = async () => {
  try {
    const usersCollection = db.firestore().collection("users");
    const snapshot = await usersCollection.get();
    const fetchedUsers = snapshot.docs.map((doc) => doc.data());
    return fetchedUsers;
  } catch (error) {
    console.error(error)
  }
};


const logInWithEmailAndPassword = async (email, password) => {
  // console.log("signin hit");
  let res =  await signInWithEmailAndPassword(auth, email, password);
  // console.log(res);
  return res;
};

const registerWithEmailAndPassword = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    // .log();
    return user.uid;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = async() => {
  await signOut(auth);
};

export {
  auth,
  EmailAuthProvider,
  reauthenticateWithCredential,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
