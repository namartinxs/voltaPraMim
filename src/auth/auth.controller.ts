import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./dto/login.dto";
import type { Response } from "express";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(
        @Body() dados: LoginDTO,
        @Res({ passthrough: true }) res: Response,
    ) {

        const payload = await this.authService.login(dados.email, dados.senha);


        console.log("PAYLOAD:", payload);
        res.cookie('token', payload.access_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24,
        });

        return {
            message: 'Login realizado com sucesso',
            id: payload.id,
            nome: payload.nome,
            email: payload.email,
            tipo: payload.tipo,
        };
        // return this.authService.login(dados.email, dados.senha)
    }

     @Post("logout")
    logout(
        @Res({ passthrough: true }) res: Response
    ) {
        res.clearCookie("token");

        return {
            message: "Logout realizado com sucesso",
        };
    }

}