import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'imagem_itens' })
export class ItemPerdidoImagemEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    @Column({ name: 'url', length: 100, nullable: false })
    url!: string;
}