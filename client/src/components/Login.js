import React, { useState } from "react";
import {
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  GithubAuthProvider,
} from "firebase/auth";

const Login = () => {
  const provider = new GithubAuthProvider();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithRedirect(auth, provider);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};
export default Login;
