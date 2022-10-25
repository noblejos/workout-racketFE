import React, { useContext } from 'react'
import { WorkoutContext } from '../context/workoutContext'
// import fromatDistanceToNow from 'date-fns/formatDistanceToNow'
import { formatDistance, formatDistanceToNow } from 'date-fns'
import { AuthContext } from '../context/AuthContext'

export default function WorkoutDetails({workout}) {
  const {user}= useContext(AuthContext)
const {dispatch} = useContext(WorkoutContext)
  const handleClick = async () => {
    // const headers={
    //   'Content-Type': 'application/json',
    //   Authorization: "Bearer " + user.token,
    // }
    const response = await fetch('https://graceful-worm-beret.cyclic.app/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + user.token,
      }
    },
   
    )
    console.log({response})
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }
  return (
    <div className='workout-details'>
        <h4>{workout.title}</h4>
        <p><strong>Load (kg): </strong>{workout.load}</p>
        <p><strong>Reps: </strong>{workout.reps}</p>
        <p>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix: true})}</p>
        <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
    </div>
  )
}
