import React, { useContext, useEffect, useState } from "react";
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
import axios from "axios";
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
    overflow: "auto",
    alignItems: "center",
    flexDirection: "column",
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
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: 1090,
    backgroundColor: "#E5E5E5",
    minHeight: "100%",
    marginTop: 20,
    borderRadius: "20px 20px 0 0",
  },
  cards: {
    height: "100%",
    paddingLeft: 113,
    paddingTop: 61,
    alignSelf: "center",
  },
  post: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    width: 250,
    height: 38,
    paddingTop: 40,
    paddingRight: 47,
    "&:hover": {
      cursor: "pointer",
    },
    textDecoration: "none",
  },
  sideBar: {
    display: "flex",
    flexDirection: "column",
  },
}));

function RenderList(list) {
  return list.map((x) => {
    return <ProjectCard project={x} />;
  });
}

const Home = () => {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const [username, setUsername] = useState("");
  const classes = useStyles();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [listState, setListState] = useState("");
  const [projects, setProjects] = useState([]);

  const signOut = (e) => {
    e.preventDefault();
    removeCookie("oAuth");
    auth.signOut();
  };
  //Get all lists and store them
  useEffect(() => {
    let query;
    if (listState === "") {
      query = "http://localhost:5000/projects";
    } else if (listState === "mentor") {
      query = "http://localhost:5000/needMentors";
    } else {
      query = "http://localhost:5000/categoryProjects?category=" + listState;
    }
    axios.get(query).then((result) => {
      console.log(result.data);
      setProjects(result.data);
    });
  }, [listState]);

  return (
    <>
      <NavBar page={"community"} />
      <div className={classes.container}>
        <div className={classes.inspoText}></div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",

            paddingTop: 20,
          }}
        >
          <div className={classes.sideBar}>
            <button
              onClick={() => {
                setListState("");
              }}
            >
              All Projects
            </button>
            <button
              onClick={() => {
                setListState("UI/UX");
              }}
            >
              UI/UX
            </button>
            <button
              onClick={() => {
                setListState("Front-End");
              }}
            >
              Front End
            </button>
            <button
              onClick={() => {
                setListState("Back-End");
              }}
            >
              Back End
            </button>
            <button
              onClick={() => {
                setListState("GameDev/Animation");
              }}
            >
              Game Dev/Animation
            </button>
            <button
              onClick={() => {
                setListState("mentor");
              }}
            >
              Looking for Mentors
            </button>
          </div>
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
            <div className={classes.cards}>{RenderList(projects)}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
