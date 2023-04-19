import React from "react"
import BuyTicket from "./BuyTicket"

function EventCard({name, date, description, location, image, age_restriction, price, event, user}){
    return(
        <div class='mx-10 mb-8 border rounded shadow-sm'>
            <h1 class='p-4 text-2xl font-medium'>{name}</h1>
            <img src={image} alt={name} class='flex w-1/3 mx-auto mb-1'/>
            <p class='font-medium text-lg'>{location}</p>
            <p>{date}</p>
            <p class='py-2'>{description}</p>
            <div class='flex flex-row justify-center pb-2'>
                <p>${price}</p>
                <BuyTicket event={event} user={user}/>
            </div>
        </div>
    )
}

export default EventCard