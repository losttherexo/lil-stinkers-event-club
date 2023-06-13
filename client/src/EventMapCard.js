import React, {useState} from 'react'
import BuyTicket from "./BuyTicket"


function EventMapCard({name, image, location, latitude, longtitude, setLat, setLng, description, price, ageRestriction, venue, user, event}) {
    function handleCoordinates() {
        setLat(latitude)
        setLng(longtitude)
    }

    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

  return (
    <div class='items-center mx-10 mb-8 border rounded shadow-md p-6 max-w-md'>
        <h2 class='text-2xl font-medium'>{name}</h2>
        <h2>{location}</h2>
        <img onClick={handleCoordinates} src={image} alt={name} class='flex w-1/3 mx-auto mb-1'/>
        <div class='flex flex-row my-4 justify-center'>
            <button onClick={toggleModal} class="block w-32 mx-1 py-2.5 rounded-md bg-amber-300  text-center text-sm font-semibold text-slate-950 shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950 border-solid border-2 border-slate-950" >
                View Details
            </button>
        </div>
        {isOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-60 flex justify-center items-center z-50">
                <div className="bg-white rounded shadow p-4 max-w-xl">
                    <h2 class='text-2xl font-medium py-4'>{name} - {venue}</h2>
                    <img class='flex w-1/3 mx-auto mb-1' src={image}/>
                    <h2 class='py-2'>{description}</h2>
                    <h2>Price: {price}</h2>
                    <div class='flex flex-row my-4 justify-center'>
                        <button onClick={toggleModal} class='border rounded-lg shadow-sm mx-2 px-2 hover:bg-slate-900 hover:text-white'>Close</button>
                        <BuyTicket event={event} user={user}/>
                        {/* <button className="w-32 mx-1 py-2.5 rounded-md bg-amber-300 text-center font-semibold text-slate-950 hover:bg-slate-500 hover:text-white border shadow-sm font-bold px-4 my-4 rounded border-solid border-2 border-slate-950">Buy Ticket</button> */}
                    </div>
                </div>
            </div>
        )}
    </div>

  )
}

export default EventMapCard
