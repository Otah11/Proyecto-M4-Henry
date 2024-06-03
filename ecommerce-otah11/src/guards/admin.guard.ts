/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from "../roles/role.enum";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        // Obtener los roles requeridos para el handler actual
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);

        // Si no se requieren roles, permitir el acceso
        if (!requiredRoles) {
            return true;
        }

        // Obtener la solicitud y el usuario
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log(user);

        // Validar el rol del usuario
        const hasRole = () => {
            return requiredRoles.some((role) => user?.roles?.includes(role));
        };

        const valid = user && user.roles && hasRole();
        console.log(valid);

        if (!valid) throw new UnauthorizedException("No tiene permisos para acceder a esta ruta");
        return true;
    }
}
