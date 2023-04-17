import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <h3>Login With Username</h3>
      <label htmlFor="username">Username: </label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {/* <label htmlFor="password">Password: </label>
      <input
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /> */}
      <button type="submit">Login</button>
      <p>Don't have an account? You can <a href='/signup'>Sign up</a> right here</p>
    </form>
  );
}

export default Login;