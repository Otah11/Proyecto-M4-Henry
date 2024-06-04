// import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export function LoggerMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log(`Se hizo una peticion de tipo ${req.method} a la ruta ${req.url} el dia ${new Date()}`);
    next();
}






