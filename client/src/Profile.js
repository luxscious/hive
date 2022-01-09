import React, { useContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCookies } from "react-cookie";
import NavBar from "./components/NavBar";
import { Avatar, makeStyles } from "@material-ui/core";
import axios from "axios";
import bg from "./assets/combBg.svg";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const useStyles = makeStyles((theme) => ({
  container: {
    position: "fixed",
    padding: 0,

    width: "100%",
    height: "100%",
    backgroundImage: `url(${bg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover ",

    display: "flex",
    overflow: "auto",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 90,
  },
  login: {
    fontFamily: "Raleway Light",
    fontSize: 64,
  },

  items: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 125,
  },
  button: {
    backgroundColor: "rgb(255,102,102,85%)",
    color: "white",
    fontFamily: "Raleway",
    fontWeight: "semi-bold",
    letterSpacing: 2,
    width: 259,
    height: 59,
    border: 0,
    borderRadius: 40,
    "&:hover": {
      backgroundColor: "#FF6666",
      cursor: "pointer",
    },
  },
}));

const getUserDetails = async (token) => {};
const Profile = () => {
  const auth = getAuth();
  const classes = useStyles();
  const [user, setUser] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      });
  }, []);
  return (
    <>
      <NavBar page={"profile"} />
      <div className={classes.container}>
        {cookies.oAuth ? (
          <div className={classes.items}>
            <h1 className={classes.login}>{user?.login},</h1>
            {loading ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 5,
                  }}
                >
                  <CircularProgress style={{ color: "#FF6666" }} />
                </Box>
              </>
            ) : (
              <Avatar
                alt="profile"
                src={user?.avatar_url}
                style={{ width: 193, height: 193, padding: 25 }}
              />
            )}

            <form onSubmit={signOut}>
              <button type="submit" className={classes.button}>
                BUZZ OUT
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </>
  );
};
export default Profile;
