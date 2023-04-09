import { Controller, Get, Param } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UsersService } from './users.service';
import { ReservationService } from 'src/reservations/reservations.service';

@Controller('users')
export class ReservationsController {
	constructor(private usersService: UsersService, private reservationsService: ReservationService) {}
}
