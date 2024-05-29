import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import {config as dotenvConfig} from "dotenv"
import { JwtService } from "@nestjs/jwt";

dotenvConfig({path: '.development.env'})


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Invalid token');
        }
        const token = authHeader.split(' ')[1];
        try {
            const decoded = this.jwtService.verify(token);
            req.user = decoded;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}