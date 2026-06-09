import { Injectable } from "@nestjs/common";
import { ChamadoRepository } from "./chamado.repository";
import { ChamadoEntity } from "./chamado.entity";
import { ListarChamadoDTO } from "./dto/ListarChamado.dto";

@Injectable()
export class ChamadoService {
    constructor(
        // Removido o @InjectRepository(UsuarioEntity)
        // Agora injetamos a sua classe de repositório customizada!
        private readonly chamadoRepository: ChamadoRepository
    ) { }

    async listarChamados() {
        const chamadosSalvos = await this.chamadoRepository.listar();
        return chamadosSalvos.map(
            chamado => new ListarChamadoDTO(chamado.id, chamado.idUsuario, chamado.idItem, chamado.comentario)
        );
    }

    async listarItensPorId(id: string) {
        return await this.chamadoRepository.buscarPorId(id);
    }
    async criarChamado(chamadoEntity: ChamadoEntity) {
        return await this.chamadoRepository.salvar(chamadoEntity);
    }

    async deletarUsuario(id: string) {
        return await this.chamadoRepository.remove(id);
    }
}