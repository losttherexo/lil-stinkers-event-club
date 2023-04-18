import React from "react"

function EventCard({name, date, description, events, image, age_restriction, tickets}){
    return(
        <div class='mx-10 mb-8 border rounded shadow-sm'>
            <h1 class='p-4 text-2xl font-medium'>{name}</h1>
            <img src={image} alt={name} class='flex w-1/3 mx-auto mb-1'/>
            <p>{date}</p>
            <p>{description}</p>
            <button class='border rounded-lg shadow-sm px-2 my-2'>Buy Tix</button>
        </div>
    )
}

export default EventCard