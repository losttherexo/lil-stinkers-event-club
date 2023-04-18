import React from "react"
import VenueCard from './VenueCard'

function Venues({venuesArray}){

    const venueComponents = venuesArray.map(venue => <VenueCard key={venue.id} name={venue.name} location={venue.location} capacity={venue.capacity} events={venue.events} image={venue.image}/>)

    return(
        <div class='flex flex-col justify-center text-center'>
            <h1 class='p-6 m-3 text-4xl font-bold'>Welcome to Venues</h1>
            {venueComponents}
        </div>
    )
}

export default Venues