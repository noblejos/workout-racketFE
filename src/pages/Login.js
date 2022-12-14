import { useState } from "react"
import Navbar from "../componets/Navbar"
import {useLogin} from "../hooks/useLogin"

const Login = () => {
  const {login, isLoading, error}=useLogin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    login(email, password)
    // console.log(email, password)
  }

  return (
    <>
    <Navbar/>
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
      <button>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
    </>
  )
}

export default Login