import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsuarioEntity } from "./usuario.entity";

@Injectable()
export class UsuarioRepository {
    // Injetamos o gerenciador do TypeORM aqui dentro
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly ormRepository: Repository<UsuarioEntity>
    ) { }

    async buscarPorId(id: string): Promise<UsuarioEntity> {
        const possivelUsuario = await this.ormRepository.findOneBy({ id });

        if (!possivelUsuario) {
            throw new NotFoundException('Usuário não existe');
        }

        return possivelUsuario;
    }

    async buscaPorEmail(email: string): Promise<UsuarioEntity | null> {
        const usuario = await this.ormRepository.findOneBy({ email });
        return usuario;
    }

    async salvar(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        return await this.ormRepository.save(usuario);
    }

    async listar(): Promise<UsuarioEntity[]> {
        return await this.ormRepository.find();
    }

    async existeComEmail(email: string): Promise<boolean> {
        const possivelUsuario = await this.ormRepository.findOneBy({ email });
        return possivelUsuario !== null;
    }

    async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>): Promise<UsuarioEntity> {
        // Garante que o usuário existe antes de atualizar
        await this.buscarPorId(id);

        // Executa o update no banco
        await this.ormRepository.update(id, dadosDeAtualizacao);

        // Retorna o usuário atualizado com os dados novos do banco
        return this.buscarPorId(id);
    }

    async remove(id: string): Promise<UsuarioEntity> {
        const usuario = await this.buscarPorId(id);

        // Se a sua entity usa @DeleteDateColumn, use .softDelete(id)
        // Como queremos deletar definitivo por enquanto, usamos o .delete(id)
        await this.ormRepository.delete(id);

        return usuario;
    }
}