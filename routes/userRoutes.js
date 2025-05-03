import express from 'express';
import verifyToken from '../middleware/authMiddleware.js'
import authorizedRoles from '../middleware/roleMiddleware.js';

const router = express.Router();

//only admin access
router.get("/admin", verifyToken, authorizedRoles("admin"), (req, res) => {
    res.json({message: "Welcome admin"})
})

//both admin and manager
router.get("/manager", verifyToken, authorizedRoles("admin", "manager"), (req, res) => {
    res.json({message: "Welcome manager"})
})

//All users
router.get("/user", verifyToken, authorizedRoles("admin", "manager", "user"), (req, res) => {
    res.json({message: "Welcome user"})
})

export default router