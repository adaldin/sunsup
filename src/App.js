// React
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import Header from "./components/header/Header";
import Menu from "./components/menu/Menu.js";
// Pages
import Home from "./pages/home/Home.js";
import Explore from "./pages/explore/Explore.js";
import Profile from "./pages/profile/Profile.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Menu />
      </BrowserRouter>
    </>
  );
}

export default App;
