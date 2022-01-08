import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { initializeApp } from "firebase/app";

import { getAuth, getRedirectResult, GithubAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import Login from "./components/Login.js";
import Home from "./Home.js";

const firebaseConfig = {
  apiKey: "AIzaSyA5khC5wSAUfQ3UJfaMQofsiiNKhX7siXE",
  authDomain: "beehive-88888888.firebaseapp.com",
  projectId: "beehive-88888888",
  storageBucket: "beehive-88888888.appspot.com",
  messagingSenderId: "704359860217",
  appId: "1:704359860217:web:be129ca99d7714bf0b1f28",
};
const firebaseApp = initializeApp(firebaseConfig);

function App() {
  const auth = getAuth();

  const [user, loading, error] = useAuthState(auth);
  console.log(user);
  if (!user) {
    getRedirectResult()
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        if (credential) {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          const token = credential.accessToken;
          // ...
        }
        console.log(credential.accessToken);

        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GithubAuthProvider.credentialFromError(error);
      });
  }

  return (
    <div className="App">
      <Router>
        <>
          <Switch>
            <Route path="/Login">
              {user ? <Redirect to="/dashboard" /> : <Login />}
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
