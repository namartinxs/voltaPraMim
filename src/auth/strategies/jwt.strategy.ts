import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";


interface JwtPayload {
    sub: string;
    email: string;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: (req) => {
                return req?.cookies?.token;
            },

            ignoreExpiration: false,
            secretOrKey: process.env.SECRET_JWT!,
        });
    }

    async validate(payload: JwtPayload) {
        return payload;

    }
}