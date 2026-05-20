import { StatusUsuario, TipoUsuario } from "./dto/CriarUsuario.dto";

export class UsuarioEntity {
    id!: string;
    nome!: string;
    email!: string;
    status!: StatusUsuario;
    tipo!: TipoUsuario;
    senha!: string;
}