import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { config as dotenvConfig} from "dotenv"
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
            const secret = process.env.JWT_SECRET;
            const payload = this.jwtService.verify(token, {secret});
            payload.exp = new Date(payload.exp * 1000)
            payload.iat = new Date(payload.iat * 1000);
            req.user = payload;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}