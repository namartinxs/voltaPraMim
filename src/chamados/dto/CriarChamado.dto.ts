import { IsNotEmpty, IsOptional } from "class-validator";

export class CriarChamadoDTO {
    @IsNotEmpty({ message: 'O comentario não pode ser vazio' })
    comentario!: string;

    @IsOptional()
    idUsuario!: string;

    @IsOptional()
    idItem!: string;


}