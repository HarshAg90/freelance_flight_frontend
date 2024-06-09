import React, { useEffect, useState } from "react";
import {
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  auth,
} from "@/src/firebase"; // Replace with the actual path to your Firebase auth file
import Layout from "@/src/layout/Layout";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uid, setUid] = useState("");

  useEffect(() => {
    // Extract UID from local storage on component mount or page reload
    const storedUid = localStorage.getItem("uid");
    if (storedUid) {
      setUid(storedUid);
    }
  }, []);

  useEffect(() => {
    console.log(uid);
  }, [uid]);

  const handleSignInWithGoogle = async () => {
    const { data, newUser } = await signInWithGoogle();
    handleAuthResult(data, newUser);
    window.location.href = "/";
  };

  const handleLoginWithEmailAndPass = async () => {
    try {
      const res = await logInWithEmailAndPassword(email, password);
      const user = res.user;
      handleAuthResult(user, false);
    } catch (error) {
      console.error(error);
      // Handle login error
    }
  };

  const handleRegisterWithEmailAndPassword = async () => {
    try {
      const uid = await registerWithEmailAndPassword(email, password);
      // Handle successful registration
      console.log("User registered with UID:", uid);
    } catch (error) {
      console.error(error);
      // Handle registration error
    }
  };

  const handleLogout = async () => {
    await logout();
    // Remove UID from local storage upon logout
    localStorage.removeItem("uid");

    window.location.href = "/AuthPage";
    // Additional logout handling if needed
  };

  const handleAuthResult = (user, newUser) => {
    // Save UID to local storage upon successful login
    localStorage.setItem("uid", user.uid);
    // Handle additional logic based on whether it's a new user or an existing user
    if (newUser) {
      // Handle new user
    } else {
      // Handle existing user
    }
    // Additional logic if needed
  };

  return (
    <Layout extraClass={"pt-160"}>
      <div id="AuthPage">
        <h1>User Profile</h1>
        {!uid ? (
          <div className="login">
            <h1>Login Page</h1>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="">
              <button onClick={handleLoginWithEmailAndPass}>Login</button>
              <button onClick={handleRegisterWithEmailAndPassword}>
                Register
              </button>
            </div>
            <div className="line"></div>
            <button className="google" onClick={handleSignInWithGoogle}>
              Sign in with Google
            </button>
          </div>
        ) : (
          <div className="profile">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AuthPage;
