import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReservationService } from './reservations.service';

@Module({
	providers: [PrismaService],
	controllers: [ReservationService],
	exports: [ReservationService],
})
export class ReservationModule {}
