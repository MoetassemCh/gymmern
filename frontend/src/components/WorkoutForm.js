import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";


const WorkoutForm = () => {
const {dispatch}=useWorkoutContext()
const {user}=useAuthContext()
    const [title,setTitle]=useState('')
    const [reps, setReps] = useState("");
    const [load, setLoad] = useState("");
    const [error, setError] = useState(null);
   

    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(!user){
          setError('You must be logged in')
          return
        }
        const workout={title,load,reps}

        const result = await fetch("/api/workout", {
          method: "POST",
          body: JSON.stringify(workout),
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${user.token}`,
          },
        });
        const json=await result.json()
        if(!result.ok){
setError(json.error)
        }
        if(result.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            dispatch(
              { type: "CREATE_WORKOUT", payload: json }
            );
        }

    }
    return (
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>
        <label>Exercise Title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label>Load (in kg):</label>
        <input
          type="text"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
        />
        <label>Reps:</label>
        <input
          type="text"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
        />
        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}
      </form>
    );
}
 
export default WorkoutForm;