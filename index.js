import express from 'express';
import dotenv from 'dotenv';
import dbconnect from './dbconnect.js';
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()
const app = express()
dbconnect();

//ENV setups
const PORT = process.env.PORT;

//Middleware
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

app.get('/', (req, res) => {
    res.send("Auth backend work")
})

app.listen(PORT, () => {
    console.log(`App running at ${PORT}`);
})


