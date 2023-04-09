import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReservationService } from './reservations.service';
import { Prisma } from '@prisma/client';
import { AuthenticatedUser } from 'nest-keycloak-connect';

@Controller('reservations')
export class ReservationsController {
	constructor(private reservationsService: ReservationService) {}
	@Get()
	getReservations() {
		return this.reservationsService.findAllReservations({}) || 'No reservations found';
	}

	@Post()
	createReservation(@Body() params: Prisma.ReservationCreateInput, @AuthenticatedUser() user: any) {
		console.log('user', user);
		return this.reservationsService.createReservation(
			{
				...params,
			},
			{
				name: user.name,
				email: user.email,
				sub: user.sub,
			},
		);
	}

	@Get('users/:userId')
	getUserReservations(@Param('userId') userId: number) {
		return this.reservationsService.findAllReservations({
			where: {
				userId,
			},
		});
	}
}
