// React
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import Header from "./components/header/Header";
// Pages
import Home from "./pages/home/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
