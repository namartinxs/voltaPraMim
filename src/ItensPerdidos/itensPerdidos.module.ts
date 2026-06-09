import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";
import { ItensPerdidosService } from "./itensPerdidos.service";
import { ItensPerdidosRepository } from "./itensPerdidos.repository";
import { ItensPerdidosController } from "./itensPerdidos.controller";
import { ItensPerdidoEntity } from "./itensPerdidos.entity";



@Module({
    imports: [TypeOrmModule.forFeature([ItensPerdidoEntity])],
    controllers: [ItensPerdidosController],
    providers: [ItensPerdidosService, ItensPerdidosRepository]
})

export class ItensPerdidosModule { }

