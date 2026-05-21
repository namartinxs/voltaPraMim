import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { localizacaoItem, statusItem } from "./criarItemPerdido.dto";

export class CriarItemDTO {
    @IsOptional()
    @IsEnum(localizacaoItem, { message: 'A localização informada é inválida' })
    localizado_em!: localizacaoItem;

    @IsOptional()
    @IsEnum(statusItem, { message: 'O status informado é inválido' })
    status!: statusItem;

    @IsOptional()
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    nome!: string;

    @IsOptional()
    @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
    descricao!: string;

    @IsOptional()
    //  formato de data (ex: "2026-05-20")
    @IsDateString({}, { message: 'A data deve estar em um formato ISO válido (AAAA-MM-DD)' })
    data_recebido!: string;

    @IsOptional()
    @IsNotEmpty({ message: 'Imagem não pode ser vazio' })
    imagem!: string;
}