import React from "react"

function VenueCard({name, location, capacity, events, image}){
    return(
        <div className='mx-10 mb-8 border rounded shadow-md'>
            <h1 className='p-4 text-2xl font-medium'>{name}</h1>
            <img src={image} alt={name} className='flex w-1/2 mx-auto mb-1'/>
            <p>{location}</p>
            <p>Max Capacity: {capacity}</p>
        </div>
    )
}

export default VenueCard