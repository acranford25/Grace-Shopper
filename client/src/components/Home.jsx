// import React from "react";
import Imageslider from "./Imageslider";
import { motion as m } from "framer-motion";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import "../App.css";

export default function Home() {
  const { user, loggedIn } = useAuth();
  return (
    <m.div
      className="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeIn" }}
    >
      <section class="text">
        <h3></h3>
        <h1>
          <span>Vintage Modern Music</span>{" "}
        </h1>
      </section>

      <figure>
        <Imageslider />
      </figure>
      <div className="home-description">
        <br></br>
        {(loggedIn === false || user.isGuest) && (
          <p>
            <Link to="/login">
              {" "}
              <u>Login</u>
            </Link>
            {""} or
            <Link to="/register">
              {" "}
              <u>Register Here</u>
            </Link>
          </p>
        )}
      </div>
    </m.div>
  );
}
