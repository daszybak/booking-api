import { Controller, Get, Post } from '@nestjs/common';
import { ReservationService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
	constructor(private reservationsService: ReservationService) {}
	@Get()
	getReservations() {
		return this.reservationsService.findAllReservations({}) || 'No reservations found';
	}
	@Post()
	createReservation() {
		return this.reservationsService.createReservation({
			start: new Date(),
			finish: new Date(),
		});
	}
}
