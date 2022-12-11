import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import categories, { getMovies } from "../api";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState({});

  const fetchRandomMovie = async (_path) => {
    try {
      const data = await getMovies(
        categories.find((category) => category.name === "netflixOriginals").path
      );
      const randomIndex = Math.floor(Math.random() * data.results.length);
      setMovie(data.results[randomIndex]);
    } catch (error) {
      console.log("Erro randomMovie: ", error);
    }
  };

  useEffect(() => {
    fetchRandomMovie();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner-container"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        roundPosition: "center-center",
      }}
    >
      <div className="banner-content">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner-description">
          <h2>{truncate(movie?.overview, 150)}</h2>
        </div>

        <div className="banner-button-container">
          <button className="banner-button">Assistir</button>
          <button className="banner-button">Minha Lista</button>
        </div>
      </div>
    </header>
  );
}

export default Banner;
