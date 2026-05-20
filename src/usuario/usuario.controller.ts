import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";

import { CriarUsuarioDTO } from "./dto/CriarUsuario.dto";

import { v4 as uuid } from "uuid";
import { ListarUsuarioDTO } from "./dto/ListarUsuario.dto";
import { AtualizarUsuarioDTO } from "./dto/AtualizarUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { UsuarioRepository } from "./usuario.repository";

// METODOS
@Controller('/usuarios')
export class UsuarioController {
    // private usuarioRepository = new UsuarioRepository()
    constructor(private usuarioRepository: UsuarioRepository) { }

    @Post()
    async criarUsuario(@Body() dadosUsuario: CriarUsuarioDTO) {
        const usuarioEntity = new UsuarioEntity();
        usuarioEntity.email = dadosUsuario.email;
        usuarioEntity.nome = dadosUsuario.nome;
        usuarioEntity.status = dadosUsuario.status;
        usuarioEntity.tipo = dadosUsuario.tipo;
        usuarioEntity.id = uuid()

        this.usuarioRepository.salvar(usuarioEntity);

        return { usuario: new ListarUsuarioDTO(usuarioEntity.id, usuarioEntity.nome, usuarioEntity.tipo), status: 'usuario criado com sucesso!' };
    }

    @Get()
    async listarUsuario() {
        const usuariosSalvos = await this.usuarioRepository.listar();
        const usuariosLista = usuariosSalvos.map(usuario => new ListarUsuarioDTO(usuario.id, usuario.nome, usuario.tipo))

        return usuariosLista
    }

    @Put('/:id')
    async atualizarUsuario(@Param('id') id:string, @Body() novosDados: AtualizarUsuarioDTO){
       const usuarioAtualizado = await this.usuarioRepository.atualiza(id,novosDados)
        return{
            usuarioAtualizado,
            mensagem: 'usuario atualizado com sucesso'
        }
    }

    @Delete('/:id')
    async deletarUsuario(@Param('id') id:string){
        const usuarioRemovido = await this.usuarioRepository.remove(id);

        return{
            usuario:usuarioRemovido,
            status: 'deletado com sucesso'
        }
    }
}