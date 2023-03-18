import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReservationModule } from './reservations/reservations.module';

@Module({
	imports: [ConfigModule.forRoot(), ReservationModule],
})
export class AppModule {}
