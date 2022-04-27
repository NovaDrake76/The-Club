import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import backgr from "../images/backHome.webp";
import mion from "../images/mion.webp";
import satoko from "../images/satokoGame.webp";
import rena from "../images/renaGame.webp";
import rika from "../images/rikaGame.webp";

function Home() {
  const [dialogText, setDialogText] = useState(
    "Welcome back! What are we gonna play today?"
  );

  return (
    <div
      className="home"
      style={{
        backgroundImage: `url(${backgr})`,
        backgroundSize: `cover`,
        backgroundPosition: `center`,
      }}
    >
      <div className="topHome">
        <div className="games">
          <Link
            to="/satoko"
            className="gameContent"
            onMouseEnter={() => setDialogText("Play blackjack with Satoko.")}
            onMouseLeave={() =>
              setDialogText("Welcome back! What are we gonna play today?")
            }
          >
            <img className="gameImage" src={satoko} alt="satoko" />
            <h3>BlackJack</h3>
          </Link>

          <div
            className="gameContent"
            onMouseEnter={() =>
              setDialogText("Rena is late, i wonder where she is...")
            }
            onMouseLeave={() =>
              setDialogText("Welcome back! What are we gonna play today?")
            }
          >
            <img className="gameImage" src={rena} alt="rena" />

            <h3>Coming soon...</h3>
          </div>
          <div
            className="gameContent"
            onMouseEnter={() =>
              setDialogText(
                "Rika is training to the Watanagashi, she can't play."
              )
            }
            onMouseLeave={() =>
              setDialogText("Welcome back! What are we gonna play today?")
            }
          >
            <img className="gameImage" src={rika} alt="rika" />
            <h3>Coming soon...</h3>
          </div>
        </div>
      </div>
      <div className="bottomHome">
        <h2 className="dialog">{dialogText}</h2>
        <img className="mion" src={mion} alt="mion" />
      </div>
    </div>
  );
}

export default Home;
