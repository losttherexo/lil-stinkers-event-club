
import React, {useState, useEffect} from 'react'
import Home from "./Home"
import Navbar from "./Navbar"
import Venues from "./Venues"
import Events from "./Events"
import Login from "./Login"
import SignUp from "./SignUp"
import {
    Routes,
    Route,
  } from "react-router-dom";
import Profile from "./Profile"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
library.add(faEye,faEyeSlash)

function App() {

    const [user, setUser] = useState(null);
    // const [query, setQuery] = useState('')

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

    function handleUpdate(user) {
        setUser(user)
    }

    const [venuesArray, setVenuesArray] = useState([])

    useEffect(() => {
        fetch('http://localhost:5555/venues')
            .then(r => r.json())
            .then(setVenuesArray)
    },[])

    const [eventsArray, setEventsArray] = useState([])

    // const search = eventsArray.filter((event) =>
    // event.date.includes(query))

    useEffect(() => {
        fetch('http://localhost:5555/events')
            .then(r => r.json())
            .then(data => {
                const sortedEvents = data.sort((a, b) => new Date(a.date) - new Date(b.date));
                setEventsArray(sortedEvents);
              })
    },[])

    const addEvent = (newEventObj) => {
        setEventsArray([...eventsArray, newEventObj])
    }

  return (
    <div className="App">
        <header className="App-header">
            <Navbar user={user} setUser={setUser} onLogout={handleLogout}/>
                <Routes>
                    <Route path="/" element={<Home user={user}/>} />
                    <Route path="/venues" element={<Venues venuesArray={venuesArray}/>} />
                    {/* <Route path="/events" element={<Events eventsArray={eventsArray} search={search}/>} /> */}
                    <Route path="/events" element={<Events addEvent={addEvent} eventsArray={eventsArray} user={user}/>} />
                    <Route path="/login" element={<Login handleLogin={setUser}/>} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/profile" element={<Profile user={user} handleLogout={handleLogout} handleUpdate={handleUpdate} setUser={setUser}/>} />
                    <Route path="*" element={<h1>404 Page Not Found</h1>} />
                </Routes>
        </header>
    </div>
  );
}

export default App;
