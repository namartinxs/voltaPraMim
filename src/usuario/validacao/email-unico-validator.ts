import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

import { Injectable } from "@nestjs/common";
import { UsuarioRepository } from "../usuario.repository";
@Injectable()
@ValidatorConstraint({ async: true })
export class EmailUnicoValidator implements ValidatorConstraintInterface {
    constructor(private usuarioRepository: UsuarioRepository) { }
    // o metodo validete retorna true ou false se true ta valido
    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const usuarioComEmailExiste = await this.usuarioRepository.existeComEmail(value)
        return !usuarioComEmailExiste;

    }


}

export const EmailUnico = (opDeVlidacao: ValidationOptions) => {
    return (objeto: Object, propiedade: string) => {
        registerDecorator({ target: objeto.constructor, propertyName: propiedade, options: opDeVlidacao, constraints: [], validator: EmailUnicoValidator })
    }

}