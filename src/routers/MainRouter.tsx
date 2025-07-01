import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import { useEffect } from "react";
import History from "../pages/History";
import Config from "../pages/Config";

const WindowsScroll = () => {
  const scroll = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [scroll]);

  return null;
};

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-pomodoro" element={<About />} />
        <Route path="/history" element={<History />} />
        <Route path="/config" element={<Config />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <WindowsScroll />
    </BrowserRouter>
  );
};

export default MainRouter;
