import { Injectable } from '@nestjs/common';
import type { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async createUser(data: Prisma.UserCreateInput): Promise<User> {
		return this.prisma.user.create({
			data,
		});
	}

	async findUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: userWhereUniqueInput,
		});
	}

	async findAllUsers(params: {
		skip?: number;
		take?: number;
		cursor?: Prisma.UserWhereUniqueInput;
		where?: Prisma.UserWhereUniqueInput;
		orderBy?: Prisma.UserOrderByWithRelationInput;
	}): Promise<User[]> {
		return this.prisma.user.findMany({
			...params,
		});
	}
}
