import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import EditForm from './EditForm';
import TicketCard from './TicketCard';

function Profile({user, setUser , handleLogout, handleUpdate, tix}){
    const navigate = useNavigate()
    const [hideEditForm, setHideEditForm] = useState(true)
    const [isOpen, setIsOpen] = useState(false);

    const tixComponents = tix
        .filter(tix => tix.fan_id === user.id)
        .map(tix => <TicketCard key={tix.id} event={tix.event.name} date={tix.event.date} location={tix.event.venue.name} image={tix.event.image}/>)
    
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
        fetch(`http://localhost:5555/fans/${user.id}`,{
        method: 'DELETE'
        })
        handleLogout()
        navigate('/events')
    }


    return(
        <div class="flex flex-col mx-auto max-w-2xl items-center text-center justify-between gap-x-6 p-6  py-10 lg:px-8">
            <h1 class="text-5xl font-bold tracking-tight text-slate-900 text-left py-6">Hi {user && user.first_name}!</h1>
            <div class='flex flex-row my-4'>
                <button onClick={handleHideEditForm} class="block w-32 md:w-48 lg:w-56 mx-1 py-2.5 rounded-md bg-slate-900  text-center text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950" >Edit User</button>
                <button onClick={toggleModal} class="block w-32 md:w-48 lg:w-56 mx-1 rounded-md bg-amber-300  text-center text-sm font-semibold text-slate-950 shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950 border-solid border-2 border-slate-950"><Link to="./">Delete User</Link></button>
            </div>
            <div class='flex'>
                <EditForm user={user} setUser={setUser} handleUpdate={handleUpdate} hide={hideEditForm}/>
            </div>
            <div class="grid md:grid-rows-none lg:grid-cols-4 gap-4 w-screen max-w-3xl py-10">
                <div class="col-span-2 md:text-center lg:text-left items-left py-10">
                    <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-3xl py-6">Your Information</h2>
                    <h3 class="text-xl tracking-tight text-slate-900 py-2">Name: {user && user.first_name} {user && user.last_name}</h3>
                    <h3 class="text-xl tracking-tight text-slate-900 py-2">Email: {user && user.email}</h3>
                    <h3 class="text-xl tracking-tight text-slate-900 py-2">Birthday: {formattedDate}</h3>
                </div>
                <div>
                    <div class='py-10 gap-6 col justify-center text-center items-center w-screen max-w-lg '>
                        <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-3xl text-center p-6">Your Upcoming Events</h2>
                        {tixComponents}
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded shadow p-4">
                        <h2 class='py-2'>Are you sure you don't wanna vibe?</h2>
                        <button onClick={toggleModal} className="hover:bg-slate-900 hover:text-white border shadow font-bold px-4 rounded">Pls get me out of here</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile