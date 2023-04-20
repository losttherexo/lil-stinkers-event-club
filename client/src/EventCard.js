import React from "react"
import BuyTicket from "./BuyTicket"

function EventCard({name, date, description, location, image, age_restriction, price, event, user}){

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${month}/${day}/${year}`;
      };

    const formattedDate = formatDate(date);


    return(
        <div class='mx-10 mb-8 border rounded shadow-sm p-6'>
            <h1 class='p-4 text-2xl font-medium'>{name}</h1>
            <img src={image} alt={name} class='flex w-1/3 mx-auto mb-1'/>
            <p class='font-medium text-lg'>{location}</p>
            <p>{formattedDate}</p>
            <p class=''>{description}</p>
            <p>{age_restriction ? "This event is 18 and up" : null}</p>
            <div class='flex flex-row justify-center pt-2'>
                <p>${price}</p>
                <BuyTicket event={event} user={user}/>
            </div>
        </div>
    )
}

export default EventCard