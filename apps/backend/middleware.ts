import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export function jwtMiddleWare(req : Request , res : Response , next: NextFunction) {
    const jwtHeaders = req.headers["authorization"];
    const jwtToken = jwtHeaders?.split(" ")[1]
   
    try {
        //console.log(jwtToken);
       // console.log(jwtHeaders)
        const AUTH_KEY = Bun.env.AUTH_JWT_KEY
        const decoded =  jwt.decode(jwtToken , AUTH_KEY , {
            algorithms : ['RS256']
        })
        if(decoded?.sub) {
            
            req.userId = decoded.sub
            next()
        }
    } catch (error) {
        res.status(400).json({
            message : "Decoding Error"
        })
        return
    }
 

}