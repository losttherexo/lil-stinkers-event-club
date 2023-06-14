import React from "react"

function TicketCard({event, date, location, image, ticket, deleteEvent}){

    const handleDelete = (e) => {
        fetch(`http://localhost:5555/tickets/${ticket.id}`,{
        method: 'DELETE'
        })
        deleteEvent(ticket.id)
    }

    return(
        <div className='mx-10 mb-8 border rounded shadow-lg'>
            <div>
                <p className="py-4 font-bold">{event} - {date} - {location}</p>
                <img src={image}/>
                <button onClick={handleDelete} className="mx-2 my-4 hover:bg-slate-900 hover:text-white border shadow font-bold px-4 rounded">Remove This Event</button>
            </div>
        </div>
    )
}

export default TicketCard