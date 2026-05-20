import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";

import { EmailUnicoValidator } from "./validacao/email-unico-validator";
import { UsuarioRepository } from "./usuario.repository";

@Module({
    imports: [],
    controllers: [UsuarioController],
    providers: [UsuarioRepository,EmailUnicoValidator]
})

export class UsuarioModule{}

