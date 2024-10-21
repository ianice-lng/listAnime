import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./css/animeDetail.css";

function AnimeDetail() {
    const { id } = useParams();
    const [anime, setAnime] = useState(null);
    const [episodes, setEpisodes] = useState([]);
    const [selectedPage, setSelectedPage] = useState(null);

    useEffect(() => {
        const urlAnime = `https://kitsu.io/api/edge/anime/${id}`;
        fetch(urlAnime)
            .then(async (response) => {
                const animeData = await response.json();
                setAnime(animeData.data);
            });

        const urlEpisode = `https://kitsu.io/api/edge/anime/${id}/episodes`;
        fetch(urlEpisode)
            .then(async (response) => {
                const animeEpisodeData = await response.json();
                setEpisodes(animeEpisodeData.data);
                setSelectedPage(animeEpisodeData.links);
            });
    }, [id]);

    const episodeNextPage = () => {
        if (selectedPage && selectedPage.next) {
            const urlEpisode = selectedPage.next;
            fetch(urlEpisode)
                .then(async (response) => {
                    const animeEpisodeData = await response.json();
                    setEpisodes(animeEpisodeData.data);
                    setSelectedPage(animeEpisodeData.links);
                });
        }
    };
    const episodePrevPage = () => {
        if (selectedPage && selectedPage.prev) {
            const urlEpisode = selectedPage.prev;
            fetch(urlEpisode)
                .then(async (response) => {
                    const animeEpisodeData = await response.json();
                    setEpisodes(animeEpisodeData.data);
                    setSelectedPage(animeEpisodeData.links);
                });
        }
    };
    const episodeNumberPage = (event) => {
        if (selectedPage && event.target.value && event.target.value > 0) {
            const urlEpisode = `https://kitsu.io/api/edge/anime/${id}/episodes?page%5Blimit%5D=10&page%5Boffset%5D=${event.target.value - 1}`;
            fetch(urlEpisode)
                .then(async (response) => {
                    const animeEpisodeData = await response.json();
                    setEpisodes(animeEpisodeData.data);
                    setSelectedPage(animeEpisodeData.links);
                });
        }
    };
    const episodeLastPage = () => {
        if (selectedPage && selectedPage.last) {
            const urlEpisode = selectedPage.last;
            fetch(urlEpisode)
                .then(async (response) => {
                    const animeEpisodeData = await response.json();
                    setEpisodes(animeEpisodeData.data);
                    setSelectedPage(animeEpisodeData.links);
                });
        }
    };
    const episodeFirstPage = () => {
        if (selectedPage && selectedPage.first) {
            const urlEpisode = selectedPage.first;
            fetch(urlEpisode)
                .then(async (response) => {
                    const animeEpisodeData = await response.json();
                    setEpisodes(animeEpisodeData.data);
                    setSelectedPage(animeEpisodeData.links);
                    console.log(animeEpisodeData.links);
                });
        }
    };
    return (
        <>
        <button className="back-button" onClick={() => window.history.back()}>Retour</button>
        <div className="anime-detail ">
            
            {anime ? (
                <>
                    <h1>{anime.attributes.canonicalTitle}</h1>
                    <img src={anime.attributes.posterImage.large} alt={anime.attributes.canonicalTitle} />
                    <p>{anime.attributes.synopsis}</p>
                </>
            ) : (<div>Chargement...</div>)}

<ul className="episodeList">
    {episodes ? episodes.map((episode) => (
        <li key={episode.id} className="ep">
            <div className="episode-title">
                {episode.attributes.canonicalTitle === null ? "Titre non disponible" : episode.attributes.canonicalTitle}
            </div>
            <img src={episode.attributes.thumbnail !== null ? episode.attributes.thumbnail.original : anime.attributes.posterImage.large} alt="img episode" />
            <div className="episode-info"><span>Épisode {episode.attributes.number}</span>
            </div>
        </li>
    )) : (<div>Chargement...</div>)}
</ul>

<div className="pagination">
    <button className="page-btn first-page" onClick={episodeFirstPage} title="First Page">
        &#171;
    </button>
    <button className="page-btn prev-page" onClick={episodePrevPage} title="Previous Page">
        &#8249;
    </button>
    <input type="number" className="page-number-input" onChange={episodeNumberPage} placeholder="1" />
    <button className="page-btn next-page" onClick={episodeNextPage} title="Next Page">
        &#8250;
    </button>
    <button className="page-btn last-page" onClick={episodeLastPage} title="Last Page">
        &#187;
    </button>
</div>
        </div>
        </>
    );
}

export { AnimeDetail };
