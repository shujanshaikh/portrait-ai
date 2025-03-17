import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config";




export function jwtMiddleWare(req : Request , res : Response , next : NextFunction) {
    const jwtHeaders = req.headers["authorization"];
    if(!jwtHeaders) {
        res.status(400).json({
            message : "Invalid jwtHeaders"
        })
        return
    }

    const decoded = jwt.verify(JWT_SECRET , jwtHeaders)
    if(!decoded || !decoded.sub) {
       res.json({
        message : "Not decoded"
       })
    }

    req.userId = decoded.sub as string
    next()
}