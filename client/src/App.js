
import React, {useState, useEffect} from 'react'
import Home from "./Home"
import Navbar from "./Navbar"
import Venues from "./Venues"
import Tickets from "./Tickets"
import Login from "./Login"
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
  } from "react-router-dom";

function App() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("/check_session").then((response) => {
            if (response.ok) {
                response.json().then((user) => setUser(user));
            }
        });
    }, []);

    function handleLogin(user) {
        setUser(user);
    }

    function handleLogout() {
        setUser(null);
    }

  return (
    <div className="App">
        <header className="App-header">
                <Navbar user={user} onLogout={handleLogout} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/venues" element={<Venues />} />
                    <Route path="/tickets" element={<Tickets />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="*" element={<h1>404 Page Not Found</h1>} />
                </Routes>
        </header>
    </div>
  );
}

export default App;
