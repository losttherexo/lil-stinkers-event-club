import { useState } from "react";
import {Link} from 'react-router-dom'
import './index.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username}),
      // body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => onLogin(user))
        // console.log(username);
      }
    });
  }

  return (
    <div>
        
        <form onSubmit={handleSubmit} class="mx-auto mt-16 max-w-sm sm:mt-20">
            <div class="mx-auto max-w-2xl text-center justify-between gap-x-6 p-6 lg:px-8">
                <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">Login</h2>
            </div>
            <div>
                <label for="username" class="block text-sm font-semibold leading-6 text-gray-900">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6"
                />
            </div>
      {/* <label htmlFor="password">Password: </label>
      <input
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /> */}
            <div class="mt-10">
                <button type="submit" class="block w-full rounded-md bg-slate-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300">Login</button>
            </div>
            <div class="mx-auto flex items-center   gap-x-2">
                <p>Don't have a username?</p>
                <Link className="signupbtn" to="/signup">Sign Up!</Link>
            </div>
            
        </form>
        
    </div>
  );
}

export default Login;