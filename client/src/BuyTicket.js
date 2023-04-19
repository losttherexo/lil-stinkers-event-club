import React, {useState} from 'react'

const BuyTicket = (event) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
      };

    
    const handleClick = () => { 
        setIsOpen(!isOpen)
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
        // console.log(event.event)
    }

    return (
        <div>
          <button onClick={handleClick} class='border rounded-lg shadow-sm mx-2 px-2 hover:bg-slate-900 hover:text-white'>Buy Tix</button>
          {isOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded shadow p-4">
                <h2>Congrats!!</h2>
                <p className='mb-2'>Your ticket to {event.name} has been purchased!</p>
                <button onClick={toggleModal} className="hover:bg-slate-900 hover:text-white border shadow font-bold px-4 rounded">Done</button>
            </div>
            </div>
        )}
        </div>
    )
}

export default BuyTicket;