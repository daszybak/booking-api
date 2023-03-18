import { Injectable } from '@nestjs/common';
import type { Prisma, Reservation } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ReservationService {
	constructor(private prisma: PrismaService) {}

	async findReservation(reservationWhereUniqueInput: Prisma.ReservationWhereUniqueInput): Promise<Reservation | null> {
		return this.prisma.reservation.findUnique({
			where: reservationWhereUniqueInput,
		});
	}

	async findAllReservations(params: {
		skip?: number;
		take?: number;
		cursor?: Prisma.ReservationWhereUniqueInput;
		where?: Prisma.ReservationWhereInput;
		orderBy?: Prisma.ReservationOrderByWithRelationInput;
	}): Promise<Reservation[]> {
		return this.prisma.reservation.findMany({
			...params,
		});
	}

	async createReservation(data: Prisma.ReservationCreateInput): Promise<Reservation> {
		return this.prisma.reservation.create({
			data,
		});
	}

	async updateReservation(params: { where: Prisma.ReservationWhereUniqueInput; data: Prisma.ReservationUpdateInput }): Promise<Reservation> {
		const { where, data } = params;
		return this.prisma.reservation.update({
			data,
			where,
		});
	}

	async deleteReservation(where: Prisma.ReservationWhereUniqueInput): Promise<Reservation> {
		return this.prisma.reservation.delete({
			where,
		});
	}
}
