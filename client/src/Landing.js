import React, { useContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCookies } from "react-cookie";
import NavBar from "./components/NavBar";
import { makeStyles } from "@material-ui/core";
import bg from "./assets/ProfileBg.svg";

import plus from "./assets/plus.svg";
import { Link } from "react-router-dom";

import text from "./assets/landingTxt.svg";
const useStyles = makeStyles((theme) => ({
  container: {
    position: "fixed",
    padding: 0,

    width: "100%",
    height: "100%",
    backgroundImage: `url(${bg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",

    display: "flex",
    overflow: "auto",
    alignItems: "center",
    flexDirection: "column",
  },
  inspoText: {
    backgroundImage: `url(${text})`,
    backgroundRepeat: "no-repeat",
    minWidth: 668,
    marginTop: 132,
    minHeight: 191,
  },
  items: {
    marginLeft: -700,
    flexDirection: "column",
  },
  button: {
    backgroundColor: "rgb(255,102,102,85%)",
    color: "white",
    fontFamily: "Raleway",
    fontWeight: "semi-bold",
    letterSpacing: 2,
    width: 259,
    height: 60,
    border: 0,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: "#FF6666",
      cursor: "pointer",
    },
    fontFamily: "Raleway",
    fontSize: 32,
  },
}));

const Landing = () => {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const [username, setUsername] = useState("");
  const classes = useStyles();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [listState, setListState] = useState("");
  const [projects, setProjects] = useState([]);

  return (
    <>
      <NavBar />
      <div className={classes.container}>
        <div className={classes.items}>
          <div className={classes.inspoText}></div>
          <h1
            style={{
              fontFamily: "Raleway",
              fontSize: 30,
              paddingTop: 60,
              paddingBottom: 60,
            }}
          >
            Integrated with Github.
          </h1>
          <Link to="/dashboard" className={classes.button}>
            DISCOVER
          </Link>
        </div>
      </div>
    </>
  );
};
export default Landing;
