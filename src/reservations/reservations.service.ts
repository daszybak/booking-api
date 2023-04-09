import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Reservation, UserRole } from '@prisma/client';

@Injectable()
export class ReservationService {
	private readonly logger = new Logger(ReservationService.name);
	constructor(private prisma: PrismaService) {}

	async createReservation(params: Prisma.ReservationCreateInput, user): Promise<Reservation> {
		return this.prisma.reservation.create({
			data: {
				...params,
				user: {
					connectOrCreate: {
						where: { sub: user.sub },
						create: { sub: user.sub, name: user.name, email: user.email, role: UserRole.PROVIDER },
					},
				},
			},
			include: {
				user: true,
			},
		});
	}

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
