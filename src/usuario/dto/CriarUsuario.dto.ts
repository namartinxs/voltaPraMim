import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico-validator";

export enum StatusUsuario {
    ativo = "ativo",
    inativo = "inativo",
}

export enum TipoUsuario {
    funcionario = "funcionario",
    estudante_odonto = "estudante_odonto",
    estudante_ads = "estudante_ads",
    estudante_farmacia = "estudante_farmacia",
}

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