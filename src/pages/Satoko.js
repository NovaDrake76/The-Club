import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import "../styles/Satoko.css";
import cardBack from "../images/cardBack.webp";
import a1 from "../images/1.webp";
import a2 from "../images/2.webp";
import a3 from "../images/3.webp";
import a4 from "../images/4.webp";
import a5 from "../images/5.webp";
import a6 from "../images/6.webp";
import a7 from "../images/7.webp";
import a8 from "../images/8.webp";
import a9 from "../images/9.webp";
import a10 from "../images/10.webp";
import a11 from "../images/11.webp";
import a12 from "../images/12.webp";
import a13 from "../images/13.webp";
import table from "../images/table.webp";
import backgr from "../images/backgr.webp";
import satoko1 from "../images/satoko1.webp";
import satoko2 from "../images/satoko2.webp";
import satoko3 from "../images/satoko3.webp";

function Satoko() {
  const [count, setCount] = useState(0);
  const [estourou, setEstourou] = useState(false);
  const [mao, setMao] = useState([]);
  const [stand, setStand] = useState(false);

  const [CPUcount, setCPUcount] = useState(0);
  const [CPUestourou, setCPUestourou] = useState(false);
  const [CPUmao, setCPUmao] = useState([]);
  const [CPUstand, setCPUstand] = useState(false);
  const [CPUturn, setCPUturn] = useState(false);
  const [CPUhandler, setCPUhandler] = useState(false);

  const [gameWinner, setGameWinner] = useState(satoko1);

  const baralho = useMemo(() => {
    return [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      10, 10, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 1, 2, 3, 4, 5, 6,
      7, 8, 9, 10, 10, 10, 10,
    ];
  }, []);

  useEffect(() => {
    let sum = 0;
    for (let num of mao) {
      sum = sum + num;
      setCount(sum);
    }
  }, [mao]);

  useEffect(() => {
    if (count > 21) setEstourou(true);
    if (CPUcount > 21) setCPUestourou(true);
    if (CPUcount >= 17) setCPUstand(true);
    if (estourou === true) setStand(true);
  }, [count, CPUcount, estourou]);

  useEffect(() => {
    if (CPUturn === true && CPUcount < 17) {
      setCPUmao((oldArray) => [
        ...oldArray,
        baralho[Math.floor(Math.random() * baralho.length)],
      ]);

      setCPUturn(false);
      setCPUhandler(false);
    }
  }, [CPUturn, CPUcount, baralho]);

  useEffect(() => {
    if (CPUstand === false) {
      let CPUsum = 0;
      for (let num of CPUmao) {
        CPUsum = CPUsum + num;
        setCPUcount(CPUsum);
      }
    }
  }, [
    stand,
    CPUhandler,
    count,
    CPUcount,
    estourou,
    CPUestourou,
    CPUmao,
    CPUstand,
  ]);

  useEffect(() => {
    if (stand === true && CPUhandler === false) {
      setCPUturn(true);
      setCPUhandler(true);
    }

    if (
      stand === true &&
      ((count > CPUcount && estourou === false) ||
        (estourou === false && CPUestourou === true))
    ) {
      setGameWinner(satoko2);
    }
    if (
      stand === true &&
      ((CPUcount > count && CPUestourou === false) ||
        (CPUestourou === false && estourou === true))
    ) {
      setGameWinner(satoko3);
    }
  }, [stand, CPUhandler, count, CPUcount, estourou, CPUestourou]);

  const hand = mao.map((e) => {
    const images = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13];
    return (
      <img className="handImages" src={images[e - 1]} alt={images[e - 1]} />
    );
  });

  const CPUhand = CPUmao.map((e) => {
    const images = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13];

    if (stand === true) {
      return <img src={images[e - 1]} alt={images[e - 1]} height={100} />;
    } else {
      return <img src={cardBack} alt={images[e - 1]} height={100} />;
    }
  });

  function result() {
    if (stand === true && CPUstand === true) {
      var winner = "";
      if (gameWinner === satoko2) {
        winner = "You win!";
      } else if (gameWinner === satoko3) {
        winner = "Satoko wins!";
      }

      if (CPUcount === count || (CPUestourou === true && estourou === true)) {
        winner = "It's a tie!";
      }

      return (
        <div className="result">
          <div className="playerResult"></div>Player: {count}
          <div className="cpuResult">Satoko: {CPUcount}</div>
          <div className="winner">{winner}</div>
        </div>
      );
    }
  }

  return (
    <div className="App">
      <div
        className="top"
        style={{
          backgroundImage: `url(${backgr})`,
          backgroundSize: `cover`,
          backgroundPosition: "center",
        }}
      >
        <div className="topLeft"> {result()}</div>
        <div className="topMid">
          <div className="satoko">{<img src={gameWinner} alt="satoko" />}</div>
          <div className="overlay">
            <p>{CPUstand ? "Standing..." : "waiting turn..."}</p>

            <div className="cpuHand">{CPUhand}</div>
          </div>
        </div>
        <div className="topRight">
          {/* <div className="leaderboard"></div> */}
          <Link to={"/"} className="endGame">
            End game
          </Link>
        </div>
      </div>
      <div
        className="bottom"
        style={{
          backgroundImage: `url(${table})`,
          backgroundSize: `cover`,
          backgroundPosition: "center",
        }}
      >
        <div className="bottomLeft">
          <h2 className="buttonTitle">
            You {estourou ? "are out!" : "have " + count}
          </h2>
          <p className="subtext">{stand ? "Standing..." : "Take a card ↓"}</p>
          <button
            disabled={stand || estourou}
            className="takeCard"
            onClick={() => {
              setMao((oldArray) => [
                ...oldArray,
                baralho[Math.floor(Math.random() * baralho.length)],
              ]);
              setCPUturn(true);
            }}
          >
            <img className="cardBackButton" src={cardBack} alt="card" />
          </button>
        </div>

        <div className="myHand">{hand}</div>
        <div className="bottomRight">
          <button
            className="stand"
            onClick={() => {
              setStand(true);
            }}
          >
            Stand
          </button>
          <button
            className="stand"
            onClick={() => {
              setCount(0);
              setEstourou(false);
              setMao([]);
              setStand(false);
              setCPUcount(0);
              setCPUestourou(false);
              setCPUmao([]);
              setCPUstand(false);
              setCPUturn(false);
              setCPUhandler(false);
              setGameWinner(satoko1);
            }}
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default Satoko;
