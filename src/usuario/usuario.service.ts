import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioEntity } from "./usuario.entity";
import { Repository } from "typeorm";
import { ListarUsuarioDTO } from "./dto/ListarUsuario.dto";
import { AtualizarUsuarioDTO } from "./dto/AtualizarUsuario.dto";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ) { }

    async listarUsuarios() {
        const usuariosSalvos = await this.usuarioRepository.find()
        const usuariosLista = usuariosSalvos.map(usuario => new ListarUsuarioDTO(usuario.id, usuario.nome, usuario.tipo))

        return usuariosLista
    }

    async criarUsuario(usuarioEntity: UsuarioEntity) {
        await this.usuarioRepository.save(usuarioEntity)
    }

    async atualizarUsuario(id: string, usuarioEntity: AtualizarUsuarioDTO) {
        await this.usuarioRepository.update(id, usuarioEntity)

    }

    async deletarUsuario(id: string) {
        await this.usuarioRepository.delete(id)
    }
}