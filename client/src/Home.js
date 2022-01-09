import React, { useContext, useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCookies } from "react-cookie";

const Home = () => {
  const auth = getAuth();

  const [user, loading, error] = useAuthState(auth);
  const [username, setUsername] = useState("");

  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const signOut = (e) => {
    e.preventDefault();
    removeCookie("oAuth");
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
