import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Reservation, Prisma } from '@prisma/client';

@Injectable()
export class ReservationService {
	constructor(private prisma: PrismaService) {}

	async findReservation(userWhereUniqueInput: Prisma.ReservationWhereUniqueInput): Promise<Reservation | null> {
		return this.prisma.reservation.findUnique({
			where: userWhereUniqueInput,
		});
	}

	async findAllReservations(params: {
		skip?: number;
		take?: number;
		cursor?: Prisma.ReservationWhereUniqueInput;
		where?: Prisma.ReservationWhereInput;
		orderBy?: Prisma.ReservationOrderByWithRelationInput;
	}): Promise<Reservation[]> {
		const { skip, take, cursor, where, orderBy } = params;
		return this.prisma.reservation.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
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
