import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UsuarioRepository } from '../usuario.repository';
 // Importe o seu repositório do banco

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailUnicoValidator implements ValidatorConstraintInterface {
  // 1. Injetamos o seu repositório que agora conversa com o Postgres
  constructor(private usuarioRepository: UsuarioRepository) {}

  async validate(email: string): Promise<boolean> {
    // 2. Buscamos no banco se o e-mail já existe
    const emailJaExiste = await this.usuarioRepository.existeComEmail(email);
    
    // Se ele já existe, a validação FALHA (retorna false)
    // Se ele não existe, a validação PASSA (retorna true)
    return !emailJaExiste;
  }
}

// O decorator que você usa no DTO
export function EmailUnico(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: EmailUnicoValidator,
    });
  };
}