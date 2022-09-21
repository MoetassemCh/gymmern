const express =require("express")
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controller/workoutControler");

const auth = require("../middleware/auth");

const router =express.Router()

router.use(auth);

router.get("/", getWorkouts);

//GET a single workout
router.get("/:id", getWorkout);

// POST a new workout
router.post("/", createWorkout);

// DELETE a workout
router.delete("/:id", deleteWorkout);

// UPDATE a workout
router.patch("/:id", updateWorkout);


module.exports = router;