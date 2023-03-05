import { useEffect, useState } from "react";
import "./App.css";
import searchIcon from "./assets/search.svg";
import MovieCard from "./MovieCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mode, setMode] = useState("dark")
  const [btnText, setBtnText] = useState("Light")

  const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=81066364";

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("man");
    // document.body.classname= mode;
  }, []);


  const toggleMode = ()=>{
    if(mode==='light')
      setMode('dark')
    else
      setMode('light')

    if(btnText==='Dark')
      setBtnText('Light')
    else
      setBtnText('Dark')
  }

  return (
    <div className={`app app${mode}`}>
      <h1 className={`title${mode}`}>CineSearch</h1>

      <div className={`search search${mode}`}>
        <input
          value= {searchTerm}
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={searchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      <button className={`btn btn${mode}`} onClick={toggleMode}>{btnText}</button>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard Movie1={movie} mode={mode} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
