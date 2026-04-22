import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import AllEvents from "./components/allevents";
import AAAEvents from "./components/alle";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/all-events" element={<AllEvents />} />
      <Route path="/aaa-events" element={<AAAEvents />} />
    </Routes>
  );
}