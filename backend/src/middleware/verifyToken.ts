import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import express from "express";
import { UserModel } from "db/users";

declare global {
    namespace Express {
      interface Request {
        userPayload?: object; // Define the type for userPayload here, or replace "object" with the appropriate type
      }
    }
  }


// Middleware che verifica che l'utente sia loggato analizzando il token
export const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token: string | undefined = req.cookies.token;

  if (!token) return res.status(401).json({ message: "You aren't logged in" });

  jwt.verify(token, process.env.CHIAVE_JWT as string, (err: jwt.VerifyErrors | null, payload: object | undefined) => {
    
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.userPayload = payload;
    next();
  });
};

export const verificatoken = async (req: express.Request, res: express.Response) => {
    res.send(req.userPayload);
};