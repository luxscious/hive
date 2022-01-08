import React, { useContext, useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthCredential } from "firebase/auth";

import axios from "axios";

const Home = () => {
  const auth = getAuth();

  const [user, loading, error] = useAuthState(auth);
  const [username, setUsername] = useState("");

  //   if (user) {
  //     user.getIdToken().then((result) => {
  //       console.log(result);
  //       //   axios.get("https://api.github.com/user", {
  //       //     headers: {
  //       //       Authorization: `token ${}`,
  //       //     },
  //       //   });
  //     });
  //   }

  const signOut = (e) => {
    e.preventDefault();
    auth.signOut();
  };
  return (
    <div>
      <h2>Home</h2>
      {user ? (
        <form onSubmit={signOut}>
          <button type="submit">Sign Out</button>
        </form>
      ) : null}
    </div>
  );
};
export default Home;
