import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico-validator";
import { StatusUsuario, TipoUsuario } from "./AtualizarUsuario.dto";


export class CriarUsuarioDTO {
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    nome!: string;
    @IsEmail(undefined, { message: 'O email informado invalido' })
    @EmailUnico({ message: 'email ja utilizado' })
    email!: string;
    @IsEnum(StatusUsuario, { message: 'O status deve ser um dos seguintes valores: ativo, inativo' })
    status!: StatusUsuario;
    @IsEnum(TipoUsuario, { message: 'Valor informado invalido' })
    tipo!: TipoUsuario;
    @MinLength(6,{message:'A senha precisater no minímo seis caracteres'})
    senha!: string;
}