import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import AllEvents from "./components/allevents";
import Preloader from "./components/Preloader";
import ComingSoonEvents from "./components/ComingSoonEvents";
import { imagesToPreload } from "./data/imagesToPreload";

export default function App() {
  return (
    <Preloader images={imagesToPreload}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-events" element={<AllEvents />} />
        <Route path="/coming-soon" element={<ComingSoonEvents />} />
      </Routes>
    </Preloader>
  );
}