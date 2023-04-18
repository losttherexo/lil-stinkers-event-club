import React from "react"

function VenueCard({name, location, capacity, events, image}){
    return(
        <div class='mx-10 mb-8 border rounded shadow-sm'>
            <h1 class='p-4 text-2xl font-medium'>{name}</h1>
            <img src={image} alt={name} class='flex w-1/2 mx-auto mb-1'/>
            <p>{location}</p>
            <p>Max Capacity: {capacity}</p>
        </div>
    )
}

export default VenueCard