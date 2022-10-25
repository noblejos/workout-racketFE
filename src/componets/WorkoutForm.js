import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { WorkoutContext } from '../context/workoutContext'
// import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutForm = () => {
  const { dispatch } = useContext(WorkoutContext)
  const {user} =useContext(AuthContext)

const [workouts,setWorkouts]=useState({
    title:"",
    load:"",
    reps:"",
})
  const [error, setError] = useState(null)
  const [emptyFeilds,setEmptyFeilds] =useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log({workouts})
    
    const response = await fetch('https://graceful-worm-beret.cyclic.app/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workouts),
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + user.token,
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      console.log(json)
      setEmptyFeilds(json.emptyFeilds)

    }
    if (response.ok) {
      setError(null)
      setEmptyFeilds([])
      setWorkouts({
        title:'',
        load:"",
        reps:""
      })
      
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }

  }
  const onChange=(e)=>{setWorkouts({...workouts,[e.target.name]:e.target.value})}

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input 
      className={emptyFeilds.includes('title')?'error':''}
        type="text" 
        name="title"
        onChange={onChange} 
        value={workouts.title}
      />

      <label>Load (in kg):</label>
      <input 
      className={emptyFeilds.includes('load')?'error':''}
        type="number" 
        name="load"
        onChange={onChange} 
        value={workouts.load}
      />

      <label>Number of Reps:</label>
      <input 
      className={emptyFeilds.includes('reps')?'error':''}
        type="number" 
        name="reps"
        onChange={onChange} 
        value={workouts.reps} 
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm