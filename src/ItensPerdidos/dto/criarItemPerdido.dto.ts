import { IsEnum, IsNotEmpty, IsDateString } from 'class-validator';

export enum localizacaoItem {
    espaco_interno = 'espaco_interno',
    espaco_externo = 'espaco_externo',
    biblioteca = 'biblioteca',
    andar_b = 'andar_b',
    sala_200 = 'sala_200',
    sala_202 = 'sala_202',
    sala_203 = 'sala_203',
    sala_300 = 'sala_300',
    sala_302 = 'sala_302',
    sala_303 = 'sala_303',
}

export enum statusItem {
    encontrado = 'encontrado',
    devolvido = 'devolvido',
    descartado = 'descartado',
}

export class CriarItemDTO {
    @IsEnum(localizacaoItem, { message: 'A localização informada é inválida' })
    localizado_em!: localizacaoItem;

    @IsEnum(statusItem, { message: 'O status informado é inválido' })
    status!: statusItem;

    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    nome!: string;

    @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
    descricao!: string;

    //  formato de data (ex: "2026-05-20")
    @IsDateString({}, { message: 'A data deve estar em um formato ISO válido (AAAA-MM-DD)' })
    data_recebido!: string;

    // @IsNotEmpty({ message: 'Imagem não pode ser vazio' })
    // imagem!: string;
}

