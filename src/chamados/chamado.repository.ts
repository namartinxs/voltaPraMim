import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ChamadoEntity } from "./chamado.entity";



@Injectable()
export class ChamadoRepository {
    // Injetamos o gerenciador do TypeORM aqui dentro
    constructor(
        @InjectRepository(ChamadoEntity)
        private readonly ormRepository: Repository<ChamadoEntity>
    ) { }

    // async buscarPorId(id: string): Promise<UsuarioEntity> {
    //     const possivelUsuario = await this.ormRepository.findOneBy({ id });

    //     if (!possivelUsuario) {
    //         throw new NotFoundException('Usuário não existe');
    //     }

    //     return possivelUsuario;
    // }

    // async buscaPorEmail(email: string): Promise<UsuarioEntity | null> {
    //     const usuario = await this.ormRepository.findOneBy({ email });
    //     return usuario;
    // }


    async buscarPorId(id: string): Promise<ChamadoEntity> {
        const possivelChamado = await this.ormRepository.findOneBy({ id });

        if (!possivelChamado) {
            throw new NotFoundException('Usuário não existe');
        }

        return possivelChamado;
    }

    async salvar(chamado: ChamadoEntity): Promise<ChamadoEntity> {
        return await this.ormRepository.save(chamado);
    }

    async listar(): Promise<ChamadoEntity[]> {
        return await this.ormRepository.find();
    }

    // async existeComEmail(email: string): Promise<boolean> {
    //     const possivelUsuario = await this.ormRepository.findOneBy({ email });
    //     return possivelUsuario !== null;
    // }

    // async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>): Promise<UsuarioEntity> {
    //     // Garante que o usuário existe antes de atualizar
    //     await this.buscarPorId(id);

    //     // Executa o update no banco
    //     await this.ormRepository.update(id, dadosDeAtualizacao);

    //     // Retorna o usuário atualizado com os dados novos do banco
    //     return this.buscarPorId(id);
    // }

    async remove(id: string): Promise<ChamadoEntity> {
        const chamado = await this.buscarPorId(id);

        // Se a sua entity usa @DeleteDateColumn, use .softDelete(id)
        // Como queremos deletar definitivo por enquanto, usamos o .delete(id)
        await this.ormRepository.delete(id);

        return chamado;
    }
}