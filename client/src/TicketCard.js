import React from "react"

function TicketCard({event, date, location, image}){
    return(
        <div class='mx-10 mb-8 border rounded shadow-sm'>
            <div>
                <p class="py-4 font-bold">{event} - {date} - {location}</p>
                <img src={image}/>
            </div>
        </div>
    )
}

export default TicketCard