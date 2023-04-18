import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom';

function Profile({user, setUser}){
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            fetch("/check_session").then((response) => {
                if (response.ok) {
                    response.json().then((user) => setUser(user));
                }
                else navigate('/signup')
            });
    } }, []);

    const [username, setUsername] = useState("");
//  const [password, setPassword] = useState("");
//  const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
//  const [dob, setDob] = useState("");

    const handleEdit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:5555/fans/${user.id}` , {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PATCH",
            body: JSON.stringify({
                // password,
                // password_confirmation: passwordConfirmation,
                first_name: firstName,
                last_name: lastName
            }),
        }).then((r) => {
            if (r.ok) {
              r.json().then((user) => setUser(user));
            }
        });
    }

    const handleDelete = (e) => {
        fetch(`http://localhost:5555/fans/${user.id}`,{
        method: 'DELETE'
        })
        navigate('/events')
    }

    return(
        <div class="mx-auto max-w-2xl text-center justify-between gap-x-6 p-6 lg:px-8">
            <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">Welcome {user && user.username}</h2>

            <div>
                <form onSubmit={handleEdit} class="mx-auto mt-16 max-w-sm sm:mt-20">
                    <div class="mx-auto max-w-2xl text-center justify-between gap-x-6 p-6 lg:px-8">
                        <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">Edit Profile</h2>
                    </div>
                    {/* <label for="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder={user.username}
                        autoComplete="off"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        class="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6"
                    /> */}
        {/* <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <label htmlFor="password">Password Confirmation</label>
        <input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
        /> */}
                    <label for="first-name">First Name: </label>
                    <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        placeholder={user ? user.first_name : 'meow'}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        class="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6"
                    />
                    <label for="last-name">Last Name: </label>
                    <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        placeholder={user ? user.last_name : 'potato'}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        class="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6"
                    />
                    {/* <label for="dob">Date of Birth: </label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        placeholder={user.dob}
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        class="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6"
                    /> */}
                    <div class="mt-10">
                        <button type="submit" class="block w-full rounded-md bg-slate-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300">Submit</button>
                    </div>
                </form>
            </div>
            <div class="mt-10">
                        <button onClick={handleDelete} class="block w-full rounded-md bg-amber-300 px-3.5 py-2.5 text-center text-sm font-semibold text-slate-950 shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"><Link to="./">Delete User</Link></button>
            </div>
        </div>
    )
}

export default Profile