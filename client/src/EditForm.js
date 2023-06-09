import { useState } from "react";

function EditForm({user, setUser, handleUpdate, hide}){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");


    const handleEdit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:5555/fans/${user.id}` , {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PATCH",
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName
            }),
        }).then((r) => {
            if (r.ok) {
              r.json().then((user) => {
                setUser(user)
            });
            }
        })
        setFirstName('')
        setLastName('')
        handleUpdate();
    }

    return(
        <div>
            <form onSubmit={handleEdit} hidden={hide} className="mx-auto mt-8 max-w-sm ">
                <div className="mx-auto max-w-2xl text-center justify-between gap-x-6 px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">Edit User</h2>
                </div>
                <label>First Name: </label>
                <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    placeholder={user ? user.first_name : 'meow'}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="block w-full rounded-md border-0 px-3.5 py-2 my-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6"
                />
                <label>Last Name: </label>
                <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    placeholder={user ? user.last_name : 'potato'}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="block w-full rounded-md border-0 px-3.5 py-2 my-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6"
                />

                <div className="mt-8">
                    <button type="submit" className="block w-full rounded-md bg-slate-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default EditForm