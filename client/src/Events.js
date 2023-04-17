import React from "react"
import EventCard from './EventCard'

function Events({eventsArray}){

    const eventComponents = eventsArray.map(event => <EventCard key={event.id} name={event.name} date={event.date} description={event.description} age_restriction={event.age_restriction} image={event.image} tickets={event.tickets}/>)

    return(
        <div>
            <h1>Welcome to Events</h1>
            {eventComponents}
        </div>
        
    )
}

export default Events