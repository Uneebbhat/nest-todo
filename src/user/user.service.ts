import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { PrismaClient } from 'generated/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.databaseService.user.create({
        data: createUserDto,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException('Email already exists.');
      }
      throw new InternalServerErrorException('Unexpected error occurred.');
    }
  }

  async readAll() {
    const users = {
      length: (await this.databaseService.user.findMany()).length,
      data: await this.databaseService.user.findMany(),
    };
    if (!users) {
      throw new NotFoundException('No user found');
    }

    return users;
  }

  async readOne(id: number) {
    const user = await this.databaseService.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
