import {React, useState} from "react"
import EventCard from './EventCard'


function Events({eventsArray, user}){

    const eventComponents = eventsArray.map(event => 
        <EventCard 
            key={event.id} 
            name={event.name} 
            date={event.date} 
            description={event.description} 
            age_restriction={event.age_restriction} 
            image={event.image} 
            tickets={event.tickets} 
            price={event.price}
            location={event.venue.name}
            event={event}
            user={user}
        />
    )


    

    return(
        <div class='flex flex-col justify-center text-center'>
            <h1 class='p-6 m-3 text-4xl font-bold'>Upcoming Events</h1>
            {eventComponents}
        </div>

    )
}

export default Events