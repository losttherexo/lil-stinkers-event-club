import React from "react"

function VenueCard({name, location, capacity, events, image}){
    return(
        <div>
            <h1>{name}</h1>
            <img src={image} alt={name}/>
        </div>
    )
}

export default VenueCard