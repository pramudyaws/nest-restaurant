import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;

        if (!authorization) {
            throw new UnauthorizedException('Authorization token is missing');
        }

        const token = authorization.split(' ')[1];
        try {
            const payload = this.jwtService.verify(token, { secret: this.configService.getOrThrow('JWT_SECRET') || '' });
            request.user = payload;
            return true;
        } catch (error) {
            throw new UnauthorizedException('You are not authorized');
        }
    }
}