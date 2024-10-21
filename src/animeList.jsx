import { Link, useSearchParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import "./css/animeList.css";

// Debounce function
function debounce(fn, delay) {
  let timeoutID;
  return function(...args) {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => fn(...args), delay);
  };
}

function AnimeList() {
  const [animeLists, setAnimeList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Local search term state
  const [searchParams, setSearchParams] = useSearchParams();
  const isInitialRender = useRef(true); // Track initial render

  // Fetch anime list based on search term
  useEffect(() => {
    const fetchAnimes = async () => {
      const term = searchParams.get("s") || "";
      try {
        const response = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${term}`);
        
        const result = await response.json();
        setAnimeList(result.data || []);
      } catch (error) {
        console.error("Error fetching anime data: ", error);
        setAnimeList(["error"]);
      }
    };
    fetchAnimes();
  }, [searchParams]);

  // Initialize searchTerm on first render based on URL params
  useEffect(() => {
    if (isInitialRender.current) {
      const term = searchParams.get("s") || "";
      setSearchTerm(term);
      isInitialRender.current = false; // Mark the initial render as done
    }
  }, [searchParams]);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term); // Update the local search term state as the user types
    debounceSetSearchParams(term); // Debounced URL update
  };

  const debounceSetSearchParams = debounce((term) => {
    setSearchParams({ s: term }); // Update the URL with the new search term
  }, 500);

  return (
    <>
    <div>
      <h1>Liste des animes</h1>
      <input
        type="text"
        placeholder="Rechercher un anime..."
        onChange={handleSearch}
        value={searchTerm} // Controlled input using local state
      />
      <ul>
        {animeLists[0] !== "error" ? (
          animeLists.length !== 0 ? (
            animeLists.map((anime) => (
              <li className="list-anime" key={anime.id}>
                <Link to={`/anime/${anime.id}`}>
                  <div className="imgMaxWidth">
                    <img src={anime.attributes.posterImage.large} alt={anime.attributes.canonicalTitle} />
                  </div>
                  <p>
                    {anime.attributes.canonicalTitle.length <= 17
                      ? anime.attributes.canonicalTitle
                      : `${anime.attributes.canonicalTitle.substr(0, 17)} ...`}
                  </p>
                </Link>
              </li>
            ))
          ) : (
            <h2>Cette anime n'existe pas</h2>
          )
        ) : (
          <h2>Chargement des animes en cours...</h2>
        )}
      </ul>
      
    </div>
    <footer>
      
        <p>
          Uses {" "}
          <a href="https://kitsu.io/" target="_blank" rel="noreferrer">
            API Kitsu
          </a>
        </p>
        <p>
        © 2024 - Made by <a href="https://github.com/zaphir21/"> Zaphir21 </a>
        </p>
      </footer>
</>
  );
}

export { AnimeList };