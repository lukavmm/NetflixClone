import React from "react";
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";
import { useState, useEffect } from "react";
import { getMovies } from "../api";
import "../components/Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, path, isLarge }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const handleOnClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie.title || movie.name || movie.original_name || "")
        .then((url) => {
          setTrailerUrl(url);
        })
        .catch((error) => {
          console.log("Error fetching movie trailer", error);
        });
    }
  };

  const fetchMovies = async (_path) => {
    try {
      const data = await getMovies(_path);
      setMovies(data?.results);
    } catch (error) {
      console.log("FetchMovies: ", error);
    }
  };

  useEffect(() => {
    fetchMovies(path);
  }, [path]);

  return (
    <div className="row-container">
      <h2 className="row-header">{title}</h2>
      <div className="row-cards">
        {movies?.map((movie) => {
          return (
            <img
              className={`poster-img ${isLarge && "poster-img-lg"}`}
              onClick={() => handleOnClick(movie)}
              key={movie.id}
              src={`${base_url}${
                isLarge ? movie.backdrop_path : movie.poster_path
              }`}
              alt={movie.name}
            />
          );
        })}
      </div>
      {trailerUrl && <ReactPlayer playing={true} url={trailerUrl} />}
    </div>
  );
}

export default Row;
