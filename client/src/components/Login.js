import React, { useState } from "react";
import { getAuth, signInWithRedirect, GithubAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { makeStyles } from "@material-ui/core";
import bg from "../assets/combBg.svg";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import gitIcon from "../assets/githubIcon.svg";
import Navbar from "./NavBar";
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
    zIndex: "-1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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

  login: {
    fontFamily: "Raleway Light",
    fontSize: 64,
  },
  buzz: {
    fontFamily: "Raleway Light",
    fontSize: 30,
    marginTop: 50,
  },
  items: {
    display: "flex",
    flexDirection: "column",
    marginTop: -150,
    alignItems: "center",
  },
}));
const Login = () => {
  const provider = new GithubAuthProvider();
  const classes = useStyles();
  const auth = getAuth();
  const [loading] = useAuthState(auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithRedirect(auth, provider);
  };

  return (
    <>
      <Navbar page={"login"} />
      <div className={classes.container}>
        <div className={classes.items}>
          <h1 className={classes.login}>LOG IN</h1>
          <img src={gitIcon} alt="gitIcon" width="150" />
          <h2 className={classes.buzz}>What's the buzz?</h2>

          <form onSubmit={handleSubmit}>
            <button disabled={loading} type="submit" className={classes.button}>
              BUZZ IN
            </button>
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
            ) : null}
          </form>
        </div>
        <p
          style={{
            fontFamily: "Raleway",
            fontSize: 28,
            width: 900,
            textAlign: "center",
            position: "fixed",
            bottom: 50,
          }}
        >
          Not part of the hive yet? Continue as a guest by browsing our
          ‘Community’ and ‘Resources’ tabs to learn more!
        </p>
      </div>
    </>
  );
};
export default Login;
