import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config()

const jwt_token = process.env.JWT_SECRET

const verifyToken = (req, res, next) => {
    let token
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];

        if(!token){
            return res.status(401).json({message: "No token, authorization denied"})
        };

        try{
            const decode = jwt.verify(token, jwt_token);
            req.user = decode;
            console.log(`The decoded user is ${decode}`)
            next();

        }catch (err){
            res.status(400).json({message: "Token is not valid"})
        }

    }else{
        return res.status(401)
    }

}

export default verifyToken;