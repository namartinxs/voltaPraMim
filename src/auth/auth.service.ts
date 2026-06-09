import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsuarioRepository } from "src/usuario/usuario.repository";
import * as bcrypt from "bcrypt"
@Injectable()
export class AuthService {
    constructor(
        private usuarioRepository: UsuarioRepository,
        private jwtService: JwtService
    ) { }

    async login(email: string, senha: string) {
        const usuario = await this.usuarioRepository.buscaPorEmail(email)
        if (!usuario) {
            throw new UnauthorizedException('credenciais inválidas!')

        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            throw new UnauthorizedException('credenciais inválidas!')
        }

   
        console.log("USUARIO:", usuario);
        const payload = {
            sub: usuario.id,
            email: usuario.email,
        }



        return {
            access_token: this.jwtService.sign(payload),
            tipo: usuario.tipo,
            nome: usuario.nome,
            email: usuario.email,
            id: usuario.id
        }
    }
}