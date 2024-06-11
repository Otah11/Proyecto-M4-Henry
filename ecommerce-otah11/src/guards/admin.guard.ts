/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from "../roles/role.enum";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {

        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const hasRole = () => {
            return requiredRoles.some((role) => user?.roles?.includes(role));
        };

        const valid = user && user.roles && hasRole();

        if (!valid) throw new UnauthorizedException("No tiene permisos para acceder a esta ruta");
        return true;
    }
}
