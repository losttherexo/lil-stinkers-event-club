import {React, useState} from "react"
import EventCard from './EventCard'

// function Events({eventsArray, search}){
function Events({eventsArray}){
    // const [isSorted, setIsSorted] = useState(false)
    const eventComponents = eventsArray.map(event => <EventCard key={event.id} name={event.name} date={event.date} description={event.description} age_restriction={event.age_restriction} image={event.image} tickets={event.tickets}/>)
    // function handleSortForDate() {
    //     setIsSorted(!isSorted)
    //     if(isSorted === false) search.sort((a, b) => a.date.localeCompare(b.date))
    //     else search.sort((a, b) => b.date.localeCompare(a.date))
    //   }

    return(
        <div class='flex flex-col justify-center text-center'>
            <h1 class='p-6 m-3 text-4xl font-bold'>Upcoming Events</h1>
            {/* <select onChange = {handleSortForDate}>
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select> */}
            {eventComponents}
        </div>

    )
}

export default Events