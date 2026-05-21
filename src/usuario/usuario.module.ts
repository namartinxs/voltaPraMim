import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { EmailUnicoValidator } from "./validacao/email-unico-validator";
import { UsuarioRepository } from "./usuario.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioEntity } from "./usuario.entity";
import { UsuarioService } from "./usuario.service";

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity])],
    controllers: [UsuarioController],
    providers: [UsuarioService, UsuarioRepository, EmailUnicoValidator]
})

export class UsuarioModule { }

