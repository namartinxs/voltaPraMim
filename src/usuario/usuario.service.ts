import { Injectable } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository"; // Importa o SEU repositório
import { UsuarioEntity } from "./usuario.entity";
import { ListarUsuarioDTO } from "./dto/ListarUsuario.dto";
import { AtualizarUsuarioDTO } from "./dto/AtualizarUsuario.dto";

@Injectable()
export class UsuarioService {
    constructor(
        // Removido o @InjectRepository(UsuarioEntity)
        // Agora injetamos a sua classe de repositório customizada!
        private readonly usuarioRepository: UsuarioRepository
    ) { }

    async listarUsuarios() {
        const usuariosSalvos = await this.usuarioRepository.listar();
        return usuariosSalvos.map(
            usuario => new ListarUsuarioDTO(usuario.id, usuario.nome, usuario.tipo)
        );
    }

    async criarUsuario(usuarioEntity: UsuarioEntity) {
        return await this.usuarioRepository.salvar(usuarioEntity);
    }

    async atualizarUsuario(id: string, dadosAtualizacao: AtualizarUsuarioDTO) {
        // Chamando o método atualiza mapeado no seu repositório
        return await this.usuarioRepository.atualiza(id, dadosAtualizacao);
    }

    async deletarUsuario(id: string) {
        return await this.usuarioRepository.remove(id);
    }
}