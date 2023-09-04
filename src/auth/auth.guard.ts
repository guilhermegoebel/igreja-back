import { Injectable, CanActivate, UnauthorizedException, ExecutionContext, SetMetadata } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { jwtConstants } from "./constants";
import { UserRole } from "src/user/enum/user-role.enum";

@Injectable()
export class AuthGuard {
    constructor(
        private jwtservice: JwtService,
        private reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtservice.verifyAsync(token, {
                secret: jwtConstants.secret
            });
            request['user'] = payload;

            const currentUserRole: UserRole = payload.role
            const requiredRole = this.reflector.getAllAndOverride<UserRole>(IS_ROLE_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);

            if(currentUserRole != requiredRole  && currentUserRole != UserRole.ESCRITORIO_PAROQUIAL){
                throw new UnauthorizedException();
            }

        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

}

export const IS_PUBLIC_KEY = 'isPublic';
export const IS_ROLE_KEY = 'roles';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const Role = (role: UserRole) => SetMetadata(IS_ROLE_KEY, role);
