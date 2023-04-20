
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
import { faCakeCandles,faEnvelopeCircleCheck,faSignature,faUserSecret ,faEye, faEyeSlash, faHome, faUsers, faPowerOff, faPoo, faAddressCard, faMapLocation, faChampagneGlasses} from '@fortawesome/free-solid-svg-icons'
library.add(faCakeCandles,faEnvelopeCircleCheck,faSignature,faUserSecret ,faEye,faEyeSlash, faHome, faUsers, faPowerOff, faPoo, faAddressCard, faMapLocation, faChampagneGlasses)

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

    useEffect(() => {
        fetch('http://localhost:5555/events')
            .then(r => r.json())
            .then(data => {
                const sortedEvents = data.sort((a, b) => new Date(a.date) - new Date(b.date));
                setEventsArray(sortedEvents);
              })
    },[])

    const [tixArray, setTixArray] = useState([])

    useEffect(() => {
        fetch('http://localhost:5555/tickets')
            .then(r => r.json())
            .then(setTixArray)
    },[])

    const addEvent = (newEventObj) => {
        setEventsArray([...eventsArray, newEventObj])
    }

    const deleteEvent = (deletedObjId) => {
        setTixArray(tixArray.filter(tix => tix.id !== deletedObjId))
    }

  return (
    <div className="App">
        <header className="App-header">
            <Navbar user={user} setUser={setUser} onLogout={handleLogout}/>
                <Routes>
                    <Route path="/" element={<Home user={user} eventsArray={eventsArray}/>} />
                    <Route path="/venues" element={<Venues venuesArray={venuesArray}/>} />
                    {/* <Route path="/events" element={<Events eventsArray={eventsArray} search={search}/>} /> */}
                    <Route path="/events" element={<Events addEvent={addEvent} eventsArray={eventsArray} user={user}/>} />
                    <Route path="/login" element={<Login handleLogin={handleLogin}/>} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/profile" element={<Profile user={user} handleLogout={handleLogout} handleUpdate={handleUpdate} setUser={setUser} tix={tixArray} deleteEvent={deleteEvent}/>} />
                    <Route path="*" element={<h1>404 Page Not Found</h1>} />
                </Routes>
        </header>
    </div>
  );
}

export default App;
