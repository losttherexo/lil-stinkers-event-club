
import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  Marker,
  NavigationControl,
  Popup,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import { useState } from "react";
import EventMapCard from "./EventMapCard";

function Home({user, eventsArray}) {
  const [lng, setLng] = useState(-94.5786);
  const [lat, setLat] = useState(39.0997);



  const eventComponents = eventsArray.map(event =>
    <EventMapCard
        key={event.id}
        name={event.name}
        image={event.image}
        location={event.venue.location}
        latitude={event.venue.latitude}
        longtitude={event.venue.longtitude}
        setLng={setLng}
        setLat={setLat}
        />
  )



  return (
    <div >

      <h1>Event Markers</h1>
      <Map
        mapboxAccessToken={'pk.eyJ1IjoiYmFvdmluaDI3MDkiLCJhIjoiY2xnbzZlaG1vMGJtZjNsbGgwYTE2OHp5bSJ9.X4lEWBmesW4LKgSWp5G6LQ'}
        style={{
          width: "75vw",
          height: "80vh",
          borderRadius: "15px",
          border: "2px solid red",
          marginLeft: "20px"

        }}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 3,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        <Marker longitude={lng} latitude={lat} />
        <NavigationControl position="bottom-right" />
        <FullscreenControl />

        <GeolocateControl />
      </Map>
      {eventComponents}
    </div>
  );
}

export default Home;