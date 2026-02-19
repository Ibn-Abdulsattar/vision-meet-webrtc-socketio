import "./App.css";
import {Route, Routes} from "react-router-dom";
import Home from "./landingPages/home/Home";
import Authenticate from "./landingPages/auth/Authenticate";
import GlobalAlert from "./components/GlobalAlert";
import VideoMeet from "./landingPages/video/VideoMeet";

function App() {
  return (
    <>
    <GlobalAlert />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Authenticate />} />
        <Route path="/:url" element={<VideoMeet />} />
      </Routes>
    </>
  );
}

export default App;
