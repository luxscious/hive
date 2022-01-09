import React, { useContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCookies } from "react-cookie";
import NavBar from "./components/NavBar";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 90,
  },
}));

const getUserDetails = async (token) => {};
const Profile = () => {
  const auth = getAuth();
  const classes = useStyles();
  const [user, setUser] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  console.log("USER", user);
  const signOut = (e) => {
    e.preventDefault();
    removeCookie("oAuth");
    auth.signOut();
  };

  useEffect(() => {
    axios
      .get("https://api.github.com/user", {
        headers: {
          Authorization: `token ${cookies.oAuth}`,
        },
      })
      .then((result) => {
        setUser(result.data);
      });
  }, []);
  return (
    <div>
      <NavBar page={"profile"} />
      <div className={classes.container}>
        {cookies.oAuth ? (
          <div>
            <h1>Hello {user?.login}</h1>
            <form onSubmit={signOut}>
              <button type="submit">Sign Out</button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Profile;
