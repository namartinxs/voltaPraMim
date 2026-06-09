import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { ChamadoService } from "./chamado.service";
import { CriarChamadoDTO } from "./dto/CriarChamado.dto";
import { ChamadoEntity } from "./chamado.entity";
import { ListarChamadoDTO } from "./dto/ListarChamado.dto";
import { AuthGuard } from "@nestjs/passport";
@Controller('/chamados')
export class ChamadoController {
    // private usuarioRepository = new UsuarioRepository()
    constructor(
        private chamadoService: ChamadoService
    ) { }

    // priva o acesso a quem esta logado

    //@UseGuards(AuthGuard('jwt'))
    @Post()
    async criarChamado(@Body() dadosChamado: CriarChamadoDTO) {
        const chamadoEntity = new ChamadoEntity();
        chamadoEntity.id = uuid()
        chamadoEntity.idItem = dadosChamado.idItem;
        chamadoEntity.idUsuario = dadosChamado.idUsuario;
        chamadoEntity.comentario = dadosChamado.comentario;


        await this.chamadoService.criarChamado(chamadoEntity);

        return { chamado: new ListarChamadoDTO(chamadoEntity.id, chamadoEntity.idUsuario, chamadoEntity.idItem, chamadoEntity.comentario), status: 'chamado criado com sucesso!' };
    }

    //@UseGuards(AuthGuard('jwt'))
    @Get()
    async listarChamado() {
        const chamadosSalvos = await this.chamadoService.listarChamados();
        return chamadosSalvos
    }


    //@UseGuards(AuthGuard('jwt'))
    @Get('/:id')
    async buscarPorId(@Param('id', ParseUUIDPipe) id: string) {
        return await this.chamadoService.listarItensPorId(id);
    }

    //@UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    async deletarChamado(@Param('id') id: string) {
        const usuarioRemovido = await this.chamadoService.deletarUsuario(id);

        return {
            usuario: usuarioRemovido,
            status: 'deletado com sucesso'
        }
    }
}
