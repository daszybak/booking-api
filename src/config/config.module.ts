import { Module } from '@nestjs/common';
import { KeycloakConfigService } from './keycloak.service';

@Module({
	exports: [KeycloakConfigService],
})
export class ConfigModule {}
