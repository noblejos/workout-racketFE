import axios from 'axios'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } =useContext(AuthContext)

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)
    try {
        const response =await axios.post("https://graceful-worm-beret.cyclic.app/api/user/login",{email, password})
        // console.log({response:response.data})
        window.localStorage.setItem('user', JSON.stringify(response.data))
  
      dispatch({type: 'LOGIN', payload: response.data})
  
        setIsLoading(false)
        return
      } catch (error) {
        setIsLoading(false)
        // console.log({e:error.response})
        setError(error.response.data.msg)
      }
    }

  return { login, isLoading, error }
}