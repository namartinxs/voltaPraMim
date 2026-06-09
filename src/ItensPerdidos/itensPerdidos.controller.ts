import {
    Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UploadedFile,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import { CriarItemDTO, statusItem } from "./dto/criarItemPerdido.dto";
import { ItensPerdidosService } from "./itensPerdidos.service";
import { ItensPerdidoEntity } from "./itensPerdidos.entity";
import { v4 as uuid } from "uuid";
import { AtualizarItemDTO } from "./dto/atualizarItemPerdido";

//imports de upload
import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';

import { extname } from 'path';
import { AuthGuard } from "@nestjs/passport";
@Controller('/itens-perdidos')

export class ItensPerdidosController {
    constructor(private readonly itensService: ItensPerdidosService) { }


    //@UseGuards(AuthGuard('jwt'))
    @Post()
    @UseInterceptors(
        FileInterceptor('imagem', {
            storage: diskStorage({
                destination: './uploads',

                filename: (req, file, callback) => {
                    const uniqueName =
                        `${Date.now()}${extname(file.originalname)}`;

                    callback(null, uniqueName);
                },
            }),
        }),
    )
    async criar(
        @Body() dadosItem: CriarItemDTO,
        @UploadedFile() imagem: Express.Multer.File,
    ) {
        console.log(dadosItem)
        console.log('ARQUIVO:', imagem);
        const itemEntity = new ItensPerdidoEntity();

        // dados do DTO para a Entity
        itemEntity.nome = dadosItem.nome;
        itemEntity.descricao = dadosItem.descricao;
        itemEntity.localizado_em = dadosItem.localizado_em;
        itemEntity.data_recebido = dadosItem.data_recebido
        itemEntity.statusItem = statusItem.aguardando;
        itemEntity.imagem = imagem?.filename

        itemEntity.id = uuid();


        return await this.itensService.salvarItem(itemEntity);
    }

    //@UseGuards(AuthGuard('jwt'))
    @Get('/:id')
    async buscarPorId(@Param('id', ParseUUIDPipe) id: string) {
        return await this.itensService.listarItensPorId(id);
    }


    // 3. GET Geral -ex: /itens-perdidos?nome=chave)
    //@UseGuards(AuthGuard('jwt'))
    @Get()
    async filtrar(
        @Query('nome') nome?: string,
        @Query('status') status?: statusItem,
    ) {
        // Se o usuário passou um status na URL (?status=encontrado)
        if (status) {
            return await this.itensService.listarItensPorStatus(status);
        }

        // Se o usuário passou um nome na URL (?nome=garrafa)
        if (nome) {
            return await this.itensService.listarItensPorNome(nome);
        }

        // Se não passou nenhum parâmetro (?nome= nem ?status=), lista tudo!
        return await this.itensService.listarItens();
    }

    //@UseGuards(AuthGuard('jwt'))
    @Put('/:id')
    async atualizarItem(@Param('id') id: string, @Body() novosDados: AtualizarItemDTO) {
        const itemAtualizado = await this.itensService.atualizarItem(id, novosDados)
        return {
            itemAtualizado,
            mensagem: 'item atualizado com sucesso'
        }
    }

    //@UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    async deletarItem(@Param('id') id: string) {
        const itemRemovido = await this.itensService.deletarItem(id);

        return {
            item: itemRemovido,
            status: 'deletado com sucesso'
        }
    }
}