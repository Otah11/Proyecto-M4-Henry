import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

function authGuard(req: Request, ) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return false;
    }
    const authParts = authHeader.split(':');
    if (authParts.length !== 3 || authParts[0] !== 'Basic') {
        return false;
    }
    return true;

}

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        return authGuard(req)
    }
}