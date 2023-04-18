import React from 'react'

function Profile({user}){
    return(
        <div class="mx-auto max-w-2xl text-center justify-between gap-x-6 p-6 lg:px-8">
            <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">Welcome {user.username}</h2>
        </div>
    )
}

export default Profile