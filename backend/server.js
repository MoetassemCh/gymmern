const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorHandler");
const connectDB=require("./config/database")
const PORT = process.env.PORT || 5000;
connectDB();

const app=express()
const workoutRoutes=require('./routes/workoutsRoutes')

const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.use('/api/workout',workoutRoutes)
app.use("/api/user", userRoutes);


app.use(errorHandler);


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


app.all("*", (req, res, next) => {
  res.status(404).send("<h4>resource not found</h4>");
});
