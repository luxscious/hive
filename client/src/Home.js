import React, { useEffect, useState } from "react";
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
    alignItems: "center",
  },
  cards: {
    height: "100%",
    minWidth: 760,
    paddingTop: 61,
    display: "flex",
    flexDirection: "column",
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
    flexDirection: "column",
    width: 216,
    borderColor: "#E5E5E5",
    bordWidth: 3,
    border: "solid",
    borderRadius: 20,
    maxHeight: 640,
    backgroundColor: "white",
    marginTop: 20,
    marginRight: 30,
  },
  button: {
    width: 132,
    backgroundColor: "white",
    border: "none",
    textAlign: "left",
    padding: 14,
    fontFamily: "Raleway",
    fontWeight: "bold",
    fontSize: 18,
    "&:hover": {
      cursor: "pointer",
    },
  },
  sectionOne: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    borderBottom: "solid #E5E5E5",
  },
  sectionTwo: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
  },
}));

function RenderList(list) {
  return list.map((x) => {
    return <ProjectCard project={x} />;
  });
}

const Home = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const classes = useStyles();
  const [listState, setListState] = useState("");
  const [projects, setProjects] = useState([]);

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
            <div className={classes.sectionOne}>
              <h1
                style={{
                  fontFamily: "Raleway",
                  color: "#939393",
                  fontSize: 14,
                }}
              >
                PROJECTS
              </h1>
              <button
                className={classes.button}
                onClick={() => {
                  setListState("");
                }}
              >
                Feed
              </button>
              <button
                className={classes.button}
                onClick={() => {
                  setListState("");
                }}
              >
                Trending
              </button>
              <button
                className={classes.button}
                onClick={() => {
                  setListState("");
                }}
              >
                Search
              </button>
            </div>
            <div className={classes.sectionTwo}>
              <h1
                style={{
                  fontFamily: "Raleway",
                  color: "#939393",
                  fontSize: 14,
                }}
              >
                SORT BY SKILLS
              </h1>
              <button
                style={listState === "" ? { color: "#FF8776" } : {}}
                className={classes.button}
                onClick={() => {
                  setListState("");
                }}
              >
                All Projects
              </button>
              <button
                style={listState === "UI/UX" ? { color: "#FF8776" } : {}}
                className={classes.button}
                onClick={() => {
                  setListState("UI/UX");
                }}
              >
                UI/UX
              </button>
              <button
                style={listState === "Front-End" ? { color: "#FF8776" } : {}}
                className={classes.button}
                onClick={() => {
                  setListState("Front-End");
                }}
              >
                Front End
              </button>
              <button
                style={listState === "Back-End" ? { color: "#FF8776" } : {}}
                className={classes.button}
                onClick={() => {
                  setListState("Back-End");
                }}
              >
                Back End
              </button>
              <button
                style={
                  listState === "GameDev/Animation" ? { color: "#FF8776" } : {}
                }
                className={classes.button}
                onClick={() => {
                  setListState("GameDev/Animation");
                }}
              >
                Game Dev/Animation
              </button>
              <button
                style={listState === "mentor" ? { color: "#FF8776" } : {}}
                className={classes.button}
                onClick={() => {
                  setListState("mentor");
                }}
              >
                Looking for Mentors
              </button>
            </div>
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
