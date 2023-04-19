import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import EditForm from './EditForm';
import TicketCard from './TicketCard';

function Profile({user, setUser , handleLogout, handleUpdate, tix}){
    const navigate = useNavigate()
    const [hideEditForm, setHideEditForm] = useState(true)

    const tixComponents = tix.map(tix => <TicketCard key={tix.id} event={tix.event.name}/>)

    const handleHideEditForm = () => {
        setHideEditForm(hideEditForm => !hideEditForm)
    }

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
        <div class="flex flex-col mx-auto max-w-2xl items-center text-center justify-between gap-x-6 p-6 lg:px-8">
            <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">Welcome {user && user.first_name}</h2>
            {tixComponents}
            <div class='flex flex-row my-4'>
                <button onClick={handleHideEditForm} class="block w-32 md:w-48 lg:w-56 mx-1 py-2.5 rounded-md bg-slate-900  text-center text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950" >Edit User</button>
                <button onClick={handleDelete} class="block w-32 md:w-48 lg:w-56 mx-1 rounded-md bg-amber-300  text-center text-sm font-semibold text-slate-950 shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950 border-solid border-2 border-slate-950"><Link to="./">Delete User</Link></button>
            </div>
            <div class='flex'>
                <EditForm user={user} setUser={setUser} handleUpdate={handleUpdate} hide={hideEditForm}/>
            </div>
            </div>
        // </div>
    )
}

export default Profile