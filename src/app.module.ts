import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { ItensPerdidosModule } from './ItensPerdidos/itensPerdidos.module';
import { AuthModule } from './auth/auth.module';
import { ChamadoModule } from './chamados/chamado.module';
;

@Module({
  imports: [
    AuthModule,
    UsuarioModule,
    ItensPerdidosModule,
    ChamadoModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService]
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
