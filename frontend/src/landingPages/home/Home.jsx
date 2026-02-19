import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useNavigate();

  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <h2>Vision Meet</h2>
        </div>
        <button
          className="hamburger-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation List */}
        <div className={`navlist ${isMenuOpen ? "navlist-open" : ""}`}>
          <p
            onClick={() => {
              router("/aljk23");
              setIsMenuOpen(false);
            }}
          >
            Join as Guest
          </p>
          <p
            onClick={() => {
              router("/auth");
              setIsMenuOpen(false);
            }}
          >
            Register
          </p>
          <div
            onClick={() => {
              router("/auth");
              setIsMenuOpen(false);
            }}
            role="button"
          >
            <p>Login</p>
          </div>
        </div>

        {isMenuOpen && (
          <div
            className="menu-overlay"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1>
            <span style={{ color: "#FF9839" }}>Connect</span> with your loved
            Ones
          </h1>

          <p>Cover a distance by Apna Vision Meet</p>
          <div role="button">
            <Link to={"/auth"}>Get Started</Link>
          </div>
        </div>
        <div>
          <img src="/mobile.png" alt="Mobile.png" />
        </div>
      </div>
    </div>
  );
}
