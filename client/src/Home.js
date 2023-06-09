
import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  Marker,
  NavigationControl,
  Popup,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import { useState, useEffect, useRef } from "react";
import EventMapCard from "./EventMapCard";


function Home({user, eventsArray}) {
  const [lng, setLng] = useState(-94.5786);
  const [lat, setLat] = useState(39.0997);
  const [coordinates, setCoordinates] = useState([])
  const [showPopup, setShowPopup] = useState(true)
//   const [isShown, setIsShown] = useState(false)
  const [selectedMarker, setSelectedMarker] = useState(null)
  const mapRef = useRef(null);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleClose = () => {
    // setSelectedMarker(null);``
  };


    useEffect(() => {
        fetch('http://localhost:5555/venues')
            .then(r => r.json())
            .then(data => {
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
        selectedMarker={selectedMarker}
        mapRef={mapRef}
        handleClose={handleClose}
        />
    )

  return (
    <div className='mt-28'>
        <h1 className="text-5xl text-center font-bold tracking-tight text-slate-900 py-6">The Lil Stinker's Event Club</h1>
        <p className="text-xl text-center font-md tracking-tight text-slate-900 pb-4">A hub for Lil Stinker's to find local events or host the afterparty!</p>
        <div className="grid md:grid-rows-none lg:grid-cols-4 w-screen">
            <div className="col-span-2 md:text-center lg:text-left md:items-center lg:items-left md:pt-16 ">
              <div className='flex h-[28rem] items-center'>
                <Map
                    mapboxAccessToken={'pk.eyJ1IjoiYmFvdmluaDI3MDkiLCJhIjoiY2xnbzZlaG1vMGJtZjNsbGgwYTE2OHp5bSJ9.X4lEWBmesW4LKgSWp5G6LQ'}
                    style={{borderRadius: "15px", border: "2px solid black", margin: '30px'}}
                    initialViewState={{longitude: lng, latitude: lat, zoom: 3,}}
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                >
                    <Marker longitude={lng} latitude={lat}>

                    </Marker>

                    {coordinates.map((data) => (
                        <Marker longitude={data.longtitude} latitude ={data.latitude} key={data.id}
                        onClick={() => handleMarkerClick(data)}
                        color="transparent"
                        />
                    ))}
                    <NavigationControl position="bottom-right" />
                    <FullscreenControl />
                    <GeolocateControl />
                    {coordinates.map((data) => (
                        <Popup longitude={data.longtitude} latitude={data.latitude}
                            maxWidth="150px"
                            anchor="bottom"
                            // closeButton={true}
                            // closeOnClick={false}
                            // openOnClick={true}
                            onClose={() => setShowPopup(false)}
                            onClick={() => setShowPopup(true)}
                            >
                            <strong>{data.name}</strong>, in <strong>{data.location}</strong>
                            <img src={data.image} alt={data.name} />
                        </Popup>
                    ))}
                    {selectedMarker &&
                        <Popup
                        mapRef={mapRef}
                        latitude={selectedMarker.latitude}
                        longitude={selectedMarker.longtitude}
                        maxWidth="400px"
                        anchor="center"
                        closeButton={true}
                        closeOnClick={false}
                        onClose={handleClose}
                        closeOnLeave={true}
                        >
                        <strong>{selectedMarker.name}</strong>, in <strong>{selectedMarker.location}</strong>
                        <img src={selectedMarker.image} alt={selectedMarker.name}/>
                        </Popup>
                    }
                </Map>

              </div>
            </div>
            <div className='py-10 gap-6 flex flex-col col-span-2 justify-center text-center items-center'>
                <div className=' gap-6 justify-center text-center items-center '>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-3xl text-center px-6">Upcoming Events</h2>
                    {eventComponents}
                </div>
            </div>
        </div>
    </div>
  );
}

export default Home;



// git push test


