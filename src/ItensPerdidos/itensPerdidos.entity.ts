import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { localizacaoItem, statusItem } from "./dto/criarItemPerdido.dto";

@Entity({ name: 'itens_perdidos' })

export class ItensPerdidoEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    @Column({ name: 'status_item', length: 40, nullable: false })
    statusItem!: statusItem;
    @Column({ name: ' localizado_em!', length: 40, nullable: false })
    localizado_em!: localizacaoItem;
    @Column({ name: 'nome', length: 100, nullable: false })
    nome!: string;
    @Column({ name: 'descricao', length: 100, nullable: false })
    descricao!: string;
    @CreateDateColumn({ name: 'data_recebido' })
    data_recebido!: string;
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: string;
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt!: string
    // @Column({ name: 'imagem', length: 100, nullable: false })
    // imagem!: ImagemItem[]
}