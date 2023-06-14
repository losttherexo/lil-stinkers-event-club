import React, {useState} from 'react'

function BuyTicket({event, user, tixArray, setTixArray}){

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
              fan_id: user.id,
              event_id: event.id
            }),
        })
        .then((r) => r.json())
        .then((newTix) => {
            setTixArray([...tixArray, newTix])
        })
    }

    return (
        <div>
            <button onClick={handleClick} className='bg-slate-900 text-white border rounded-lg shadow-md mx-2 px-2 hover:bg-white hover:text-slate-900'>
                Buy Tix
            </button>
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