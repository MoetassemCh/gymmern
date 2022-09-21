import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {

//  const [workouts, setWorkout] = useState([]);
const {workouts,dispatch}=useWorkoutContext()
const {user}=useAuthContext()
    useEffect(()=>{
     const fetchworkout=async()=>{
     
        const result = await fetch("/api/workout", {
          headers: { 'Authorization': `Bearer ${user.token}` },
        });
         const json = await result.json();
    
     if (result.ok) {
    //    setWorkout(json);
    dispatch({type:'SET_WORKOUTS',payload:json})
     }

     }
if(user){
fetchworkout();
}

    },[dispatch,user])

    return ( 
      <div className="home">
        <div className="workouts">
            {workouts && workouts.map((workout)=>(
   <WorkoutDetails key={workout._id} workout={workout} />
            ))}
        </div>
        <WorkoutForm />
      </div>
     );
}
 
export default Home;