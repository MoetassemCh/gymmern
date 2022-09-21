import { useAuthContext } from "./useAuthContext";
import { useWorkoutContext } from "./useWorkoutsContext";

export const useLogout=()=>{
    const {dispatch}=useAuthContext()
    const { dispatch:workoutDispatch } = useWorkoutContext();

  const logout = () => {
    localStorage.removeItem("user");

    dispatch({type:'LOGOUT'})
    workoutDispatch({ type: "SET_WORKOUTS", payload:null });
  };
  return {logout}
};
