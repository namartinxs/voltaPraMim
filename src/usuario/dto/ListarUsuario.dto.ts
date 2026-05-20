import { TipoUsuario } from "./CriarUsuario.dto";

export class ListarUsuarioDTO {
    constructor(readonly id: string,readonly nome: string, readonly tipo:TipoUsuario){}
}