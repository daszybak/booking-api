import { Module } from '@nestjs/common';
import { ReservationModule } from './reservations/reservations.module';

@Module({
	imports: [ReservationModule],
})
export class AppModule {}
