import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";

@Injectable()
export class UsuarioRepository {
    private usuarios: UsuarioEntity[] = [];

    private buscarPorId(id: string) {
        const possivelUsuario = this.usuarios.find(usuarioSalvo => usuarioSalvo.id === id);

        if (!possivelUsuario) {
            throw new Error('usuario não existe')
        }

        return possivelUsuario
    }
    async salvar(usuario: UsuarioEntity) {
        this.usuarios.push(usuario);
        console.log(this.usuarios)
    }

    async listar() {
        return this.usuarios;
    }

    async existeComEmail(email: string) {
        const possivelUsuario = this.usuarios.find(usuario => usuario.email === email)
        // se o valor de possivelUsuario eh !undefined => true
        // se nao existe valor de possivelUsuario eh undefined => false
        return possivelUsuario !== undefined;
    }

    async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
        const usuario = this.buscarPorId(id)

        Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
            if (chave === id) {
                return;
            }

            usuario[chave] = valor;
        })

        return usuario;

    }

    async remove(id: string) {
        const usuario = this.buscarPorId(id)

        this.usuarios = this.usuarios.filter(usuarioSalvo => usuarioSalvo.id !== id)
        
        return usuario

    }
}