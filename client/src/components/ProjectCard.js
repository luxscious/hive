import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { makeStyles } from "@material-ui/core";
import { useCookies } from "react-cookie";
import { Avatar } from "@material-ui/core";
import add from "../assets/add.svg";
import star from "../assets/Star.svg";
import eye from "../assets/eye.svg";
import collab from "../assets/collaborate.svg";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

const useStyles = makeStyles((theme) => ({
  card: {
    width: 760,
  },
}));

// const handleSubmit = (e) => {
//   e.preventDefault(); // Prevents default refresh by the browser
//   emailjs.sendForm(`gmail`, process.env.REACT_APP_EMAIL_USER_ID, e.target,process.env.REACT_APP_TEMPLATE_ID)
//   .then((result) => {
//   alert("Message Sent, We will get back to you shortly", result.text);
//   },
//   (error) => {
//   alert("An error occurred, Please try again", error.text);
//   });
//   };
export default function ProjectCard(props) {
  const project = props.project;
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const classes = useStyles();
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  React.useEffect(() => {
    console.log("refresh");
  }, [user, cookies]);
  let date = project.lastUpdated.substring(0, 10);
  console.log(cookies);
  return (
    <div style={{ paddingBottom: 20 }}>
      <Card className={classes.card} style={{ backgroundColor: "#C4C4C4" }}>
        <CardContent>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Avatar src={project.userPhoto} alt="picture" />
            <h1
              style={{ paddingLeft: 10, fontFamily: "Raleway", fontSize: 20 }}
            >
              {project.username}
            </h1>
            {cookies?.oAuth ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <a href="/">
                  <img alt="1" src={add} />
                </a>
                <div
                  style={{
                    height: 42,
                    borderLeft: "1px solid grey",
                    marginLeft: 15,
                    marginRight: 15,
                  }}
                ></div>
                <a href="/">
                  <img alt="1" src={star} />
                </a>
              </div>
            ) : null}
          </div>
        </CardContent>
        <CardMedia
          component="img"
          height="466"
          image={project.picture}
          width="760"
          alt="project picture"
        />
        <CardContent>
          <div
            style={{
              display: "flex",

              width: "100%",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            {cookies.oAuth ? (
              <>
                <a href={project.repo}>
                  <img alt="1" src={collab} />
                </a>
                <div
                  style={{
                    height: 42,
                    borderLeft: "1px solid grey",
                    marginLeft: 15,
                    marginRight: 15,
                  }}
                ></div>
                <a href={project.repo}>
                  <img alt="1" src={eye} />
                </a>
              </>
            ) : (
              <>
                <a href={project.repo}>
                  <img alt="1" src={eye} />
                </a>
                <div
                  style={{
                    height: 42,
                    borderLeft: "1px solid grey",
                    marginLeft: 15,
                    marginRight: 15,
                  }}
                ></div>
              </>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <h1
                style={{
                  fontFamily: "Raleway",
                  fontSize: 14,
                  textAlign: "center",
                  alignSelf: "center",
                  justifyContent: "center",
                }}
              >
                LAST UPDATED: {"   "} {date}
              </h1>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <h1
              style={{
                color: "rgba(255,102,102,85%)",
                fontSize: 20,
                fontFamily: "Raleway",
              }}
            >
              {project.username}:
            </h1>
            <h4
              style={{
                fontSize: 20,
                fontFamily: "Raleway Light",
                paddingLeft: 10,
              }}
            >
              {project.description}
            </h4>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
