import React, { useEffect } from "react";
import { AppBar, Toolbar, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.svg";
const useStyles = makeStyles((theme) => ({
  bar: {
    background: "#D0D0D0",
    height: 90,
    borderBottom: "none",
    paddingRight: 40,
    boxShadow: "none",
    justifyContent: "center",
  },
  link: {
    textDecoration: "none",
    color: "black",
    fontSize: "25",
    fontFamily: "Raleway",
    fontWeight: "Bold",
    marginLeft: 65,
    padding: 40,
  },
  currentLink: {
    color: "#FF6666",
    textDecoration: "none",
    fontSize: "25",
    fontFamily: "Raleway",
    fontWeight: "Bold",
    marginLeft: 65,
    padding: 40,
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
    textDecoration: "none",
  },
  logoText: {
    fontFamily: "Raleway",
    color: "black",
    textDecoration: "none",
    fontSize: 30,
    letterSpacing: 15,
  },
  logo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logoLink: {
    textDecoration: "none",
  },
}));

function Navbar(props) {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.bar}>
      <Toolbar className={classes.toolBar}>
        <Link to="/landing" className={classes.logoLink}>
          <div className={classes.logo}>
            <img src={logo} alt="Logo" width="80" />
            <h1 className={classes.logoText}>HIVE</h1>
          </div>
        </Link>
        <div className={classes.navlinks}>
          <Link
            to="/resources"
            className={
              props.page === "resources" ? classes.currentLink : classes.link
            }
          >
            RESOURCES
          </Link>
          <Link
            to="/"
            className={
              props.page === "community" ? classes.currentLink : classes.link
            }
          >
            COMMUNITY
          </Link>
          {props.page !== "login" ? (
            <Link
              to="/profile"
              className={
                props.page === "profile" ? classes.currentLink : classes.link
              }
            >
              YOUR HIVE
            </Link>
          ) : null}
        </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
