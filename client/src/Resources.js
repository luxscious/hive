import React from "react";
import NavBar from "./components/NavBar";
import { makeStyles } from "@material-ui/core";
import text1 from "./assets/resource1.svg";
import git from "./assets/githubIcon.svg";
import text2 from "./assets/resource2.svg";
import text3 from "./assets/resource3.svg";
import bee from "./assets/collaborate.svg";
import eye from "./assets/eye.svg";
import add from "./assets/add.svg";
import star from "./assets/Star.svg";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    overflow: "scroll",
    marginTop: 90,
  },

  section: {
    backgroundColor: "#FF998A",
    paddingTop: 50,
    paddingBottom: 50,

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  section2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  section3: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    width: 1200,
    paddingLeft: 90,
    fontFamily: "Raleway",
    fontWeight: "Bold",
  },
  section4: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    paddingTop: 80,
    width: 1300,
    fontFamily: "Raleway",
    fontWeight: "Bold",
  },
  logo: {
    width: 115,
    height: 115,
  },
  logoText: {
    fontFamily: "Raleway Light",
    fontSize: 25,
    textAlign: "center",
  },
}));

const Resources = () => {
  const classes = useStyles();

  return (
    <>
      <NavBar page={"resources"} />
      <div className={classes.container}>
        <div className={classes.section2}>
          <img src={text1} style={{ marginLeft: 200 }} alt="text" />
        </div>
        <div className={classes.section}>
          <p
            style={{
              width: 1153,
              fontFamily: "Raleway",
              color: "white",
              fontSize: 28,
            }}
          >
            We are an online community platform that enables female developers
            of all skill levels to discover, inspire, and grow in a male
            dominated industry. Through support and mentorship from members of
            our diverse colony, create and collaborate on projects from across
            the world to expand your own personal hive.{" "}
          </p>
        </div>
        <div className={classes.section2}>
          <img src={git} alt="git" style={{ width: 229, padding: 60 }} />
          <img src={text2} alt="text" />
        </div>
        <div className={classes.section3}>
          <h1 style={{ color: "#FF8776" }}>What is Github?</h1>
          <p>
            GitHub is a web-based interface that allows for real-time
            collaboration. It uses Git (an open source version control
            software), and lets multiple people make separate changes to web
            pages at the same time. On Hive, GitHub allows members to work
            together to build their projects, while permitting mentors to assist
            along the way.
          </p>
          <p>
            Learn more and sign up{" "}
            <a style={{ color: "black" }} href="https://github.com/">
              here.
            </a>
          </p>
        </div>
        <div className={classes.section4}>
          <img src={text3} style={{ marginLeft: 90 }} alt="text" />
          <div
            style={{
              marginTop: 50,
              flexDirection: "row",
              display: "flex",
              alignSelf: "center",
              marginLeft: 80,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: 256,
                alignItems: "center",
                justifyContent: "center",
                padding: 30,
              }}
            >
              <img src={bee} alt="bee" className={classes.logo} />
              <p className={classes.logoText}>
                Buzz a post when you see a user’s project you’d like to work on.
                This will let the user know you are interested.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: 256,
                alignItems: "center",
                justifyContent: "center",
                padding: 30,
              }}
            >
              <img src={eye} alt="eye" className={classes.logo} />
              <p className={classes.logoText}>
                View a project you are potentially interested in, or if it just
                seems appealing. This will not notify the user.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: 256,
                alignItems: "center",
                justifyContent: "center",
                padding: 30,
              }}
            >
              <img src={add} alt="add" className={classes.logo} />
              <p className={classes.logoText}>
                Add users to your hive. Keep in touch, work on future projects,
                share experiences!
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: 256,
                alignItems: "center",
                justifyContent: "center",
                padding: 30,
              }}
            >
              <img src={star} alt="star" className={classes.logo} />
              <p className={classes.logoText}>
                Star your favourite projects. These will appear under the ‘Star’
                tab of your GitHub account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Resources;
