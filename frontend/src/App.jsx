import { Link, Route, Routes } from "react-router-dom";
import Review from "./pages/Review.jsx";
import History from "./pages/History.jsx";
import Home from "./pages/Home.jsx";

export default function App() {
  return (
    <div className="app">
      <header className="navbar">
        <Link className="brand" to="/">Code Review Agent</Link>
        <nav>
          <Link to="/">Review</Link>
          <Link to="/history">History</Link>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/review" element={<Review />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>
    </div>
  );
}
