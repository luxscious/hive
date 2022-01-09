import React, { useContext, useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCookies } from "react-cookie";
import NavBar from "./components/NavBar";
import { makeStyles } from "@material-ui/core";
import bg from "./assets/combBg.svg";
import ProjectCard from "./components/ProjectCard";
import text from "./assets/inspoText.svg";
import plus from "./assets/plus.svg";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  container: {
    position: "fixed",
    padding: 0,
    margn: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url(${bg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover ",

    display: "flex",

    alignItems: "center",
    flexDirection: "column",
    overflow: "hidden",
  },

  inspoText: {
    backgroundImage: `url(${text})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minWidth: "100%",
    marginTop: 132,
    minHeight: 191,
  },
  items: {
    width: 1090,
    backgroundColor: "#C4C4C4",
    height: "100%",
    marginTop: 20,
    borderRadius: "20px 20px 0 0",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  cards: {
    marginTop: 61,
    paddingLeft: 113,
    overflow: "scroll",
    alignSelf: "center",
  },
  post: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    // backgroundColor: "red",
    width: 250,
    height: 38,
    paddingTop: 40,
    paddingRight: 47,
    "&:hover": {
      cursor: "pointer",
    },
    textDecoration: "none",
  },
}));
const Home = () => {
  const auth = getAuth();

  const [user, loading, error] = useAuthState(auth);
  const [username, setUsername] = useState("");
  const classes = useStyles();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const signOut = (e) => {
    e.preventDefault();
    removeCookie("oAuth");
    auth.signOut();
  };

  return (
    <>
      <NavBar page={"community"} />
      <div className={classes.container}>
        <div className={classes.inspoText}></div>
        <div className={classes.items}>
          {user ? (
            <Link to="/" className={classes.post}>
              <h1
                style={{
                  fontSize: 28,
                  fontFamily: "Raleway",
                  color: "#656565",
                  alignSelf: "center",
                  paddingRight: 8,
                }}
              >
                POST PROJECT{" "}
              </h1>
              <img src={plus} alt="plus btn" width="38"></img>
            </Link>
          ) : null}
          <div className={classes.cards}>
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
