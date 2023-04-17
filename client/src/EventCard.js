import React from "react"

function EventCard({name, date, description, events, image, age_restriction, tickets}){
    return(
        <div>
            <h1>{name}</h1>
            <img src={image}/>
        </div>
    )
}

export default EventCard