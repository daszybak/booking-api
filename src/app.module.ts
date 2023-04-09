import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard, ResourceGuard, RoleGuard, KeycloakConnectModule } from 'nest-keycloak-connect';
import { ReservationModule } from './reservations/reservations.module';
import { KeycloakConfigService } from './config/keycloak.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
		ReservationModule,
		KeycloakConnectModule.registerAsync({
			useClass: KeycloakConfigService,
			imports: [ConfigModule],
		}),
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
		{
			provide: APP_GUARD,
			useClass: ResourceGuard,
		},
		{
			provide: APP_GUARD,
			useClass: RoleGuard,
		},
	],
})
export class AppModule {}
