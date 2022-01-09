import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { initializeApp } from "firebase/app";
import axios from "axios";
import { getAuth, getRedirectResult, GithubAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCookies } from "react-cookie";
import Login from "./components/Login.js";
import Home from "./Home.js";
import Resources from "./Resources.js";
import "./index.css";
import Profile from "./Profile.js";
import Landing from "./Landing.js";
console.log(process.env);
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_AUTH_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MSG_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
const firebaseApp = initializeApp(firebaseConfig);
function App() {
  const auth = getAuth();

  const [user, loading, error] = useAuthState(auth);
  const [cookies, setCookie] = useCookies(["user"]);

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        if (credential) {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          const token = credential.accessToken;
          setCookie("oAuth", token);
        }
        // The signed-in user info.
        const user = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
      });
  }, [user, loading]);
  return (
    <div className="App">
      <Router>
        <>
          <Switch>
            <Route path="/landing">
              <Landing />
            </Route>
            <Route path="/login">
              {user ? <Redirect to="/dashboard" /> : <Login />}
            </Route>
            <Route path="/profile">
              {user ? <Profile /> : <Redirect to="/login" />}
            </Route>
            <Route path="/resources">
              <Resources />
            </Route>
            <Route path="/dashboard">
              <Home />
            </Route>
            <Route path="/">
              {user ? (
                <Redirect to="/dashboard" />
              ) : (
                <Redirect to="/dashboard" />
              )}
            </Route>
          </Switch>
        </>
      </Router>
    </div>
  );
}
export default App;
