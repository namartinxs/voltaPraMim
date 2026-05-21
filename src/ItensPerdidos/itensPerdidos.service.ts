import { Injectable } from "@nestjs/common";
import { ItensPerdidosRepository } from "./itensPerdidos.repository";
import { statusItem } from "./dto/criarItemPerdido.dto";
import { AtualizarItemDTO } from "./dto/atualizarItemPerdido";
import { ItensPerdidoEntity } from "./itensPerdidos.entity";

@Injectable()
export class ItensPerdidosService {
    constructor(
        private readonly itensPerdidoRepository: ItensPerdidosRepository
    ) { }

    async atualizarItem(id: string, dadosAtualizacao: AtualizarItemDTO) {
        return await this.itensPerdidoRepository.atualiza(id, dadosAtualizacao)
    }
    async listarItens() {
        return await this.itensPerdidoRepository.listar();
    }

    async listarItensPorId(id: string) {
        return await this.itensPerdidoRepository.buscarPorId(id);
    }
    async listarItensPorNome(nome: string) {
        return await this.itensPerdidoRepository.buscarPorNome(nome);
    }

    async listarItensPorStatus(statusItem: statusItem) {
        return await this.itensPerdidoRepository.buscarPorStatus(statusItem);
    }

    async salvarItem(item: ItensPerdidoEntity) {
        return await this.itensPerdidoRepository.salvar(item);
    }

    async deletarItem(id: string) {
        return await this.itensPerdidoRepository.remover(id)
    }


}

