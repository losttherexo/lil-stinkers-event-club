import {React, useState} from "react"
import EventCard from './EventCard'
import AddEventForm from './AddEventForm'


function Events({eventsArray, addEvent, user}){

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


    const [hideAddForm, setHideAddForm] = useState(true)
    const handleHideAddForm = () => {
        setHideAddForm(hideAddForm => !hideAddForm)
    }



    return(
        <div class='mt-28'>
            <div>
                <div  class='flex flex-col justify-center text-center items-center'>
                    <h1 class='p-6 my-3 text-4xl font-bold'>Upcoming Events</h1>
                    <button onClick={handleHideAddForm} class="block w-40 rounded-md bg-amber-300 px-3.5 py-2.5 text-center text-sm font-semibold text-slate-950 shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950 border-solid border-2 border-slate-950">{hideAddForm ? 'Add New Event' : 'Close Form'}
                    </button>
                </div>
                <div>
                    {hideAddForm ? null : <AddEventForm addEvent={addEvent}/>}
                </div>
            </div>
            <div class='p-8 flex flex-col justify-center text-center items-center'>
                {eventComponents}
            </div>
        </div>

    )
}

export default Events