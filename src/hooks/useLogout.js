import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { WorkoutContext } from '../context/workoutContext'
// import { useWorkoutsContext } from './useWorkoutsContext'

export const useLogout = () => {
    const {dispatch: workoutDispatch}=useContext(WorkoutContext)
  const { dispatch } = useContext(AuthContext)
  const logout = () => {
    localStorage.removeItem('user')
    dispatch({ type: 'LOGOUT' })
    workoutDispatch({type:'SET_WORKOUTS' ,payload: null})
  }

  return { logout }
}