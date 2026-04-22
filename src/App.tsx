import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import AllEvents from "./components/allevents";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/all-events" element={<AllEvents />} />
    </Routes>
  );
}