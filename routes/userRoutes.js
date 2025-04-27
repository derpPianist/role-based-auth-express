import express from 'express';

const router = express.Router();

//only admin access
router.get("/admin", (req, res) => {
    res.json({message: "Welcome admin"})
})

//both admin and manager
router.get("/manager", (req, res) => {
    res.json({message: "Welcome manager"})
})

//All users
router.get("/users", (req, res) => {
    res.json({message: "Welcome user"})
})

export default router