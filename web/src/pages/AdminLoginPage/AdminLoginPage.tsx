import { Link, navigate, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "src/auth";

const AdminLoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { isAuthenticated, logIn, currentUser, loading } = useAuth()


  useEffect(() => {
    if (isAuthenticated && currentUser && currentUser.role === "ADMIN") {
      navigate(routes.admin())
    }
  }, [isAuthenticated, currentUser])

  if(loading) {
    return <div>Loading...</div>
  }


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await logIn({ username, password })
    if (response.message) {
        alert(response.message)
    } else if (response.error) {
        alert(response.error)
    } else {
        alert('Welcome back!')
    }
  }
  return (
    <>
      <MetaTags title="AdminLogin" description="AdminLogin page" />

      <h1>AdminLoginPage</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </label>

        <label>
          <p>Password</p>
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </label>
          <div>
            <button type="submit">Login</button>
            <Link to={routes.adminSignup()}>Sign Up</Link>
          </div>
        </form>
    </>
  );
};

export default AdminLoginPage;
