import { useContext, useEffect, useState } from "react"
import axios from "axios"
import WorkoutDetails from "../componets/WorkoutDetails"
import WorkoutForm from "../componets/WorkoutForm"
import { WorkoutContext } from "../context/workoutContext"
import { AuthContext } from "../context/AuthContext"

export default function Home() {
    const {user}= useContext(AuthContext)
    // console.log({this: user})
    const {workouts, dispatch}=useContext(WorkoutContext)
    useEffect(()=>{
        const FetchData=async()=>{
            const headers={
                'Content-Type': 'application/json',
                Authorization: "Bearer " + user.token,
              }

            const response  = await axios.get("https://graceful-worm-beret.cyclic.app/api/workouts", {headers})
            if(response.statusText="OK"){
                // setWorkouts(response.data)
                dispatch({type:'SET_WORKOUTS', payload:response.data})
                // console.log(response)
            }
        }
        if(user){
            FetchData()
        }
        

    },[dispatch, user])
  return (
    <div className='home'>
        <div className="workouts">
            {workouts&& workouts.map((workout, index)=>(
            <WorkoutDetails key={workout._id} workout={workout}/>
            ))}
        </div>
        <WorkoutForm/>
    </div>
  )
}
