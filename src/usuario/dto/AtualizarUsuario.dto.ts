import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico-validator";
import { StatusUsuario, TipoUsuario } from "./CriarUsuario.dto";


export class AtualizarUsuarioDTO {
    @IsOptional()
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    nome!: string;
   
    @IsOptional()
    @IsEmail(undefined, { message: 'O email informado invalido' })
    @EmailUnico({ message: 'email ja utilizado' })
    email!: string;
   
    @IsOptional()
    @IsEnum(StatusUsuario, { message: 'O status deve ser um dos seguintes valores: ativo, inativo' })
    status!: StatusUsuario;
   
    @IsOptional()
    @IsEnum(TipoUsuario, { message: 'Valor informado invalido' })
    tipo!: TipoUsuario;
   
    @IsOptional()
    @MinLength(6, { message: 'A senha precisater no minímo seis caracteres' })
    senha!: string;
}