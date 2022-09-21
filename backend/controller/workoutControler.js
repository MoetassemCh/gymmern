const asyncHandler=require("express-async-handler")
const mongoose = require('mongoose')
const Workout=require("../models/workoutModel")

const getWorkouts=asyncHandler(async(req,res)=>{
const user_id=req.user.id

const workouts=await Workout.find({user_id}).sort({createdAt: -1})

 res.status(200).json(workouts);
})

const getWorkout=asyncHandler(async(req,res)=>{

    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404)
        throw new Error("no such workout")
    }

     const workout = await Workout.findById(id);

     if (!workout) {
       res.status(404)
       throw new Error("no such workout");
     }

     res.status(200).json(workout);
})



const createWorkout = asyncHandler(async (req, res) => {
 const { title, load, reps } = req.body;

 if (!title || !load || !reps) {
   res.status(400).json({ error: "Enter all field" });
   throw new Error("Please add field");
 }

 try {
    const user_id = req.user._id
    const workout = await Workout.create({title, load, reps, user_id})
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})



const deleteWorkout = asyncHandler(async (req, res) => {
 const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    res.status(404);
    throw new Error("Workout not found");
  }

  await workout.remove();
  res.status(200).json({ success: true });
});


const updateWorkout = asyncHandler(async (req, res) => {

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    res.status(404);
    throw new Error("Workout not found");
  }

  res.status(200).json(workout);
});


module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};