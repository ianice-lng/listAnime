import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

function AnimeRandom() {
  const [anime, setAnimeList] = useState([]);

  useEffect(() => {
    const url = "https://api.jikan.moe/v4/random/anime";
    fetch(url)
      .then(async (response) => {
        let animelists = await response.json();
        animelists = animelists.data;
        console.log(animelists);
        setAnimeList(animelists);
      });
  }, []);
  if (!anime) return <div>Chargement...</div>;
  return (
    <div>
  <h1>Anime Random</h1>
  <ul>
    {anime && anime.images && anime.images.jpg ? (
      <li key={anime.mal_id}>
        <Link to={`/anime/${anime.mal_id}`}>
          <h2>{anime.title}</h2>
          <img src={anime.images.jpg.large_image_url} alt={anime.mal_id} />
        </Link>
      </li>
    ) : (
      <li>Loading...</li>
    )}
  </ul>
</div>
  );
}

export { AnimeRandom };