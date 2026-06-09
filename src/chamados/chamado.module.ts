import { TypeOrmModule } from "@nestjs/typeorm";
import { ChamadoEntity } from "./chamado.entity";
import { ChamadoRepository } from "./chamado.repository";
import { ChamadoService } from "./chamado.service";
import { Module } from "@nestjs/common";
import { ChamadoController } from "./chamado.controller";

@Module({
    imports: [TypeOrmModule.forFeature([ChamadoEntity])],
    controllers: [ChamadoController],
    providers: [ChamadoService, ChamadoRepository],
    exports: [ChamadoRepository]
})

export class ChamadoModule { }