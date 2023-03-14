import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReservationService } from './reservations.service';
import { ReservationsController } from './reservations.controller';

@Module({
	providers: [PrismaService, ReservationService],
	controllers: [ReservationsController],
	exports: [ReservationService],
})
export class ReservationModule {}
