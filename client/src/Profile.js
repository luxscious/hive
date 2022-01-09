import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCookies } from "react-cookie";
import NavBar from "./components/NavBar";
import { Avatar, makeStyles } from "@material-ui/core";
import axios from "axios";
import bg from "./assets/hiveBg.svg";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import text from "./assets/hiveText.svg";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    overflow: "auto",
    alignItems: "center",
    flexDirection: "column",
  },
  login: {
    fontFamily: "Raleway Light",
    fontSize: 64,
  },

  items: {
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: 90,
    right: 42,
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
    position: "fixed",
    bottom: 50,
    right: 20,
  },
}));

const Profile = () => {
  const auth = getAuth();
  const classes = useStyles();
  const [user, setUser] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [loading, setLoading] = useState(true);
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
        <img
          src={text}
          alt="txt"
          style={{ position: "fixed", left: 65, top: 227 }}
        />
        <img
          src={bg}
          alt="bgImg"
          style={{ position: "fixed", zIndex: -1, left: 121 }}
        />
        {loading ? (
          <div
            style={{
              position: "fixed",
              top: 400,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: 5,
              }}
            >
              <CircularProgress style={{ color: "#FF6666" }} />
            </Box>
          </div>
        ) : (
          <>
            <div className={classes.items}>
              <h1 className={classes.login}>{user?.login},</h1>

              <Avatar
                alt="profile"
                src={user?.avatar_url}
                style={{
                  width: 193,
                  height: 193,
                  padding: 25,
                  position: "fixed",
                  right: 57,
                  top: 219,
                }}
              />
            </div>
            <form onSubmit={signOut}>
              <button type="submit" className={classes.button}>
                BUZZ OUT
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
};
export default Profile;
