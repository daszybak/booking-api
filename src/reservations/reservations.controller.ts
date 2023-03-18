import { Controller, Get, Post } from '@nestjs/common';
import { ReservationService } from './reservations.service';
import { Prisma } from '@prisma/client';

@Controller('reservations')
export class ReservationsController {
	constructor(private reservationsService: ReservationService) {}
	@Get()
	getReservations() {
		return this.reservationsService.findAllReservations({}) || 'No reservations found';
	}
	@Post()
	createReservation(params: Prisma.ReservationCreateInput) {
		return this.reservationsService.createReservation({
			...params,
		});
	}
}
