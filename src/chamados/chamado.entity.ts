import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'chamados' })
export class ChamadoEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    @Column({ name: 'id_usuario', length: 100, nullable: false })
    idUsuario!: string;
    @Column({ name: 'id_item', length: 100, nullable: false })
    idItem!: string;
    @Column({ name: 'comentario', length: 250, nullable: false })
    comentario!: string;
    @CreateDateColumn({ name: 'created_at' })
    createdAt!: string;
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: string;
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt!: string

}

