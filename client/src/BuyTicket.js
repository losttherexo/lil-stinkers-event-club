import React, {useState} from 'react'

const BuyTicket = (event) => {
    
    const handleClick = () => { 
        fetch("/tickets", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fan_id: event.user.id,
              event_id: event.event.id,
            }),
        })
        .then((r) => r.json())
        console.log(event.event.id)
        console.log(event.user.id)
    }

    return (
        <div>
          <button onClick={handleClick} class='border rounded-lg shadow-sm mx-2 px-2 hover:bg-slate-900 hover:text-white'>Buy Tix</button>
        </div>
    )
}

export default BuyTicket;