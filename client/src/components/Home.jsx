// import React from "react";
import Imageslider from "./Imageslider";
import { motion as m } from "framer-motion";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import "../App.css";

export default function Home() {
  const { user, loggedIn } = useAuth();
  return (
    <div className="home-page">
      <section className="text">
        <h3></h3>
        <h1>
          <span>Vintage Modern Music</span>{" "}
        </h1>
      </section>

      <figure>
        <Imageslider />
      </figure>
      <div>
        <br></br>
        {loggedIn === false || user.isGuest ? (
          <Link to="/login">
            <u className="text-black">Login</u>
          </Link>
        ) : (
          <Link to="/register">
            <u className="text-black">Register Here</u>
          </Link>
        )}
      </div>
    </div>
  );
}
