import React, {useState} from 'react'


function AddEventForm({addEvent}){

    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [ageRestriction, setAgeRestriction] = useState(false)
    const [price, setPrice] = useState('')
    const [venue, setVenue] = useState('')

    const handleAddEvent = (e) => {
        e.preventDefault()

        const newEvent = {
            name: name,
            date: date,
            description: description,
            image: image,
            age_restriction: ageRestriction,
            price: price,
            venue_id: venue
        }
        // addEvent(newEvent)

        fetch('http://localhost:5555/events', {
        method: "POST",
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(newEvent)
        })
    }


    return(
        <div class="mx-auto text-center justify-between gap-x-6 p-6 lg:px-8">
            <div class='mx-10 mb-8 border rounded shadow-sm p-6'>
                <h2 class='p-6 my-3 text-4xl font-bold'>Add an Event</h2>
                <form onSubmit={handleAddEvent} class="mx-auto mt-6 max-w-lg grid grid-cols-2 gap-4">
                <div>
                    <label for="name" class="block text-sm font-semibold leading-6 text-gray-900">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        class="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6"
                    />
                </div>
                <div>
                    <label for="date" class="block text-sm font-semibold leading-6 text-gray-900">Date</label>
                    <input
                        type="date"
                        name="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        class="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6"
                    />
                </div>
                <div>
                    <label for="description" class="block text-sm font-semibold leading-6 text-gray-900">Description</label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        class="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6"
                    />
                </div>
                <div>
                    <label for="image" class="block text-sm font-semibold leading-6 text-gray-900">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        class="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6"
                    />
                </div>
                <div>
                    <label for="ageRestriction" class="block text-sm font-semibold leading-6 text-gray-900">Age Restriction</label>
                    <select name="ageRestriction" id="ageRestriction" value={ageRestriction} onChange={(e) => setAgeRestriction(e.target.value === 'true')} class="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6">
                        <option>Select Yes or No</option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                <div>
                    <label for="price" class="block text-sm font-semibold leading-6 text-gray-900">Price</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        class="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6"
                    />
                </div>
                <div>
                    <label for="venue" class="block text-sm font-semibold leading-6 text-gray-900">Select Venue</label>
                    <select name="venue" id="venue" value={venue} onChange={(e) => setVenue(e.target.value)} class="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6">
                        <option value="">Select a Venue</option>
                        <option value="1">Stardust</option>
                        <option value="2">The Bar</option>
                        <option value="3">Elsewhere (The Hall)</option>
                    </select>
                    {/* <input
                        type="select"
                        name="price"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        class="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6"
                    /> */}
                </div>
                <button type="submit" class="block w-full rounded-md bg-slate-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300">Add Event</button>
                </form>
            </div>
        </div>
    )
}

export default AddEventForm