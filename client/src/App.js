import Home from "./Home"
import Navbar from "./Navbar"
import Venues from "./Venues"
import Tickets from "./Tickets"
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
  } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <header className="App-header">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/venues" element={<Venues />} />
                    <Route path="/tickets" element={<Tickets />} />
                    <Route path="*" element={<h1>404 Page Not Found</h1>} />
                </Routes>
        </header>
    </div>
  );
}

export default App;
