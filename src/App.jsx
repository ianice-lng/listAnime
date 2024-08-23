
// import {AnimeRandom} from "./animeRandom.jsx";
import {AnimeDetail} from "./animeDetail.jsx";
import {AnimeList} from "./animeList.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/random" element={<AnimeRandom />} /> */}
        <Route path="/anime/:id" element={<AnimeDetail />} />
        <Route path="/" element={<AnimeList />} />
      </Routes>
    </Router>
  );
}


export default App;
