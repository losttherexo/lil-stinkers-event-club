import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import EditForm from './EditForm';
import TicketCard from './TicketCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Profile({user, setUser , handleLogout, handleUpdate, tix, deleteEvent}){
    const navigate = useNavigate()
    const [hideEditForm, setHideEditForm] = useState(true)
    const [isOpen, setIsOpen] = useState(false);
    console.log(tix, user.id)
    const tixComponents = tix
        .filter(ticket => ticket.fan_id == user.id)
        .map(ticket => <TicketCard key={ticket.id} deleteEvent={deleteEvent} ticket={ticket} event={ticket.event.name} date={ticket.event.date} location={ticket.event.venue.name} image={ticket.event.image}/>)

    const toggleModal = () => {
      setIsOpen(!isOpen);
      console.log('yes')
    };

    const handleHideEditForm = () => {
        setHideEditForm(hideEditForm => !hideEditForm)
    }
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${month}/${day}/${year}`;
    };

    const formattedDate = formatDate(user && user.dob);


    useEffect(() => {
        if (!user) {
            fetch("/check_session").then((response) => {
                if (response.ok) {
                    response.json().then((user) => setUser(user));
                }
                else navigate('/signup')
            });
    } }, []);


    const handleDelete = (e) => {
        toggleModal()
        fetch(`http://localhost:5555/fans/${user.id}`,{
        method: 'DELETE'
        })
        handleLogout()
        navigate('/')
    }


    return(
        <div class='mt-28'>
        <div class="flex flex-col mx-auto max-w-2xl items-center text-center justify-between gap-x-6 p-6  py-10 lg:px-8">
            <h1 class="text-5xl font-bold tracking-tight text-slate-900 text-left py-6">
                Hi {user && user.first_name} <FontAwesomeIcon icon="fa-solid fa-user-secret"/>
            </h1>

            <div class="grid grid-cols-2 gap-8 w-screen max-w-3xl py-10 content-center">
                <div class="col-span-2 text-left px-12 justify-left py-10 border rounded shadow-md">
                    <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-3xl py-6">Your Information</h2>
                    <div class="text-left">
                    <h3 class="text-xl tracking-tight text-slate-900 py-2"><FontAwesomeIcon icon="fa-solid fa-signature"/> : {user && user.first_name} {user && user.last_name}</h3>
                    <h3 class="text-xl tracking-tight text-slate-900 py-2"><FontAwesomeIcon icon="fa-solid fa-envelope-circle-check"/> : {user && user.email}</h3>
                    {/* <h3 class="text-xl tracking-tight text-slate-900 py-2"><FontAwesomeIcon icon="fa-solid fa-cake-candles"/> : {user && user.dob}</h3> */}
                    </div>
                </div>
            </div>
                <div class='flex flex-row justify-center gap-8'>
                    <button onClick={toggleModal} class="w-32 h-12 mx-1 rounded-md bg-amber-300  text-center text-md font-semibold text-slate-950 shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950 border-solid border-2 border-slate-950"><Link to="./">Delete User</Link></button>
                    <button onClick={handleHideEditForm} class="w-32 h-12 mx-1  my-10.5 rounded-md bg-slate-900  text-center text-md font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950" >{hideEditForm ? 'Edit User' : 'Close Edit Form'}</button>
                </div>

            <div class='flex'>
                <EditForm user={user} setUser={setUser} handleUpdate={handleUpdate} hide={hideEditForm}/>
            </div>

            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded shadow p-4">
                        <h2 class='py-2'>Are you sure you don't wanna vibe?</h2>
                            <button onClick={handleDelete} className="mx-2 hover:bg-slate-900 hover:text-white border shadow font-bold px-4 rounded">Pls get me out of here</button>
                            <button onClick={toggleModal} className="mx-2 hover:bg-slate-900 hover:text-white border shadow font-bold px-4 rounded">Nevermind I like yall</button>
                    </div>
                </div>
            )}
        </div>
        <div class="max-w-2xl content-center mx-auto py-10 justify-between w-screen ">
                    <div class=' border rounded shadow-md gap-6 justify-center text-center items-center '>
                        <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-3xl text-center p-6">Your Upcoming Events</h2>
                        <div class="grid-flow-col auto-cols-2 p-6 py-10 lg:px-8">
                            {tix && tixComponents}
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Profile