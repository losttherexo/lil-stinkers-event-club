import React from "react"
import VenueCard from './VenueCard'

function Venues({venuesArray}){

    const venueComponents = venuesArray.map(venue => <VenueCard key={venue.id} name={venue.name} location={venue.location} capacity={venue.capacity} events={venue.events}/>)

    return(
        <div>
            <h1>Welcome to Venues</h1>
            {venueComponents}
        </div>
    )
}

export default Venues