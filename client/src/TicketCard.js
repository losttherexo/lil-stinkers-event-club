import React from "react"

function TicketCard({event}){
    return(
        <div class='mx-10 mb-8 border rounded shadow-sm'>
            <p>{event}</p>
        </div>
    )
}

export default TicketCard