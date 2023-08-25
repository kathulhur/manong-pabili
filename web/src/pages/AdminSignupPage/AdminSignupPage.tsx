import { navigate, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "src/auth";



const AdminSignupPage = () => {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, signUp, currentUser } = useAuth()

    useEffect(() => {
        if (isAuthenticated && currentUser && currentUser.role === "ADMIN") {
            navigate(routes.admin())
        }
    }, [isAuthenticated, currentUser])


  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await signUp({
      name,
      mobileNumber,
      username,
      password,
      role: "ADMIN",
    })

    if (response.message) {
      alert(response.message)
  } else if (response.error) {
    alert(response.error)
  } else {
      // user is signed in automatically
      alert('Welcome!')
  }
  }
  return (
    <>
      <MetaTags title="AdminSignup" description="AdminSignup page" />

      <h1>Admin Signup</h1>
      <form onSubmit={onSubmit}>
        <label>
          <p>Fullname</p>
          <input type="text" name="fullname" value={name} onChange={(e) => setName(e.target.value)}/>
        </label>
        <label>
          <p>Mobile Number</p>
          <input type="text" name="mobileNumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)}/>
        </label>
        <label>
          <p>Username</p>
          <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <button type="submit">Sign Up</button>
      </form>

    </>
  );
};

export default AdminSignupPage;
