import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { ItensPerdidoEntity } from "./itensPerdidos.entity";
import { statusItem } from "./dto/criarItemPerdido.dto";

@Injectable()
export class ItensPerdidosRepository {
    constructor(
        @InjectRepository(ItensPerdidoEntity)
        private readonly ormRepository: Repository<ItensPerdidoEntity>

    ) { }
    

    async buscarPorId(id: string): Promise<ItensPerdidoEntity> {
        const item = await this.ormRepository.findOneBy({ id })

        if (!item) {
            throw new NotFoundException('Item não existe');
        }

        return item;
    }
    // feito
    async buscarPorNome(nome: string): Promise<ItensPerdidoEntity[]> {
        const itensBuscados = await this.ormRepository.findBy({
            nome: ILike(`%${nome}%`)
        });

        if (itensBuscados.length === 0) {
            throw new NotFoundException(`Nenhum item contendo "${nome}" foi encontrado`);
        }

        return itensBuscados;
    }
    // feito
    async buscarPorStatus(statusItem: statusItem): Promise<ItensPerdidoEntity[]> {
        const itensBuscados = await this.ormRepository.findBy({ statusItem });

        if (itensBuscados.length === 0) {
            throw new NotFoundException(`Nenhum item contendo "${statusItem}" foi encontrado`);
        }

        return itensBuscados;
    }
    // feito
    async salvar(item: ItensPerdidoEntity): Promise<ItensPerdidoEntity> {
        return await this.ormRepository.save(item)

    }
    // lista
    async listar(): Promise<ItensPerdidoEntity[]> {
        return await this.ormRepository.find();
    }
    // feito
    async atualiza(id: string, dadosDeAtualizacao: Partial<ItensPerdidoEntity>): Promise<ItensPerdidoEntity> {

        await this.buscarPorId(id)
        await this.ormRepository.update(id, dadosDeAtualizacao)
        return this.buscarPorId(id);

    }
    // feito
    async remover(id: string): Promise<ItensPerdidoEntity> {
        const item = await this.buscarPorId(id);

        await this.ormRepository.delete(id);

        return item;
    }
}