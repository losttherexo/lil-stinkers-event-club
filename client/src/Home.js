
import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  Marker,
  NavigationControl,
  Popup,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import { useState, useEffect } from "react";
import EventMapCard from "./EventMapCard";


function Home({user, eventsArray}) {
  const [lng, setLng] = useState(-94.5786);
  const [lat, setLat] = useState(39.0997);
  const [coordinates, setCoordinates] = useState([])

  useEffect(() => {
    fetch('http://localhost:5555/venues')
        .then(r => r.json())
        .then(data => {
            console.log(data)
            setCoordinates(data);
          })
},[])






  const eventComponents = eventsArray.map(event =>
    <EventMapCard
        key={event.id}
        name={event.name}
        image={event.image}
        description={event.description}
        ageRestriction={event.age_restriction}
        price={event.price}
        venue={event.venue.name}
        location={event.venue.location}
        latitude={event.venue.latitude}
        longtitude={event.venue.longtitude}
        setLng={setLng}
        setLat={setLat}
        user={user}
        event={event}
        />
  )

  

  return (
    <div >
        <h1 class="text-5xl text-center font-bold tracking-tight text-slate-900 py-12">Welcome to the Lil Stinker's Event Club</h1>
        <p class="text-xl text-center font-md tracking-tight text-slate-900">A hub for Lil Stinker's to find local events or host the afterparty!</p>
        <div class="grid md:grid-rows-none lg:grid-cols-4  w-screen  py-10">
            <div class="col-span-2 md:text-center lg:text-left md:items-center lg:items-left py-10">
                <Map
                    mapboxAccessToken={'pk.eyJ1IjoiYmFvdmluaDI3MDkiLCJhIjoiY2xnbzZlaG1vMGJtZjNsbGgwYTE2OHp5bSJ9.X4lEWBmesW4LKgSWp5G6LQ'}
                    style={{
                    width: "50vw",
                    height: "80vh",
                    borderRadius: "15px",
                    border: "2px solid black",
                    marginLeft: "50px"

                    }}
                    initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    zoom: 3.5,
                    }}
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                >
                    {/*
                    <Marker longitude={-81.3789} latitude={28.5384} />
                    <Marker longitude={-104.9903} latitude={39.7392} />
                    <Marker longitude={-73.9442} latitude={40.6782} />

                */}
                    <Marker longitude={lng} latitude={lat} />
                    {coordinates.map((data) => (
                        <Marker longitude={data.longtitude} latitude ={data.latitude} key={data.id}/>
                    ))}
                    <NavigationControl position="bottom-right" />
                    <FullscreenControl />
                    <GeolocateControl />
                </Map>
            </div>
            <div class='py-10 gap-6 flex flex-col col-span-2 justify-center text-center items-center'>
                <div class=' gap-6 justify-center text-center items-center '>
                    <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-3xl text-center p-6">Upcoming Events</h2>
                    {eventComponents}
                </div>
                
            </div>
        </div>
    </div>
  );
}

export default Home;


