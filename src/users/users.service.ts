import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll() {
    return this.userRepository.find({
      relations: {
        orders: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByTelegramId(telegramId: string) {
    return this.userRepository.findOne({
      where: { telegramId },
      relations: {
        orders: true,
      },
    });
  }

  async findOrCreate(createUserDto: CreateUserDto) {
    await this.userRepository.upsert(createUserDto, {
      conflictPaths: ['telegramId'],
      skipUpdateIfNoValuesChanged: true,
    });

    const user = await this.findByTelegramId(createUserDto.telegramId);

    if (!user) {
      throw new NotFoundException(
        `User with telegramId ${createUserDto.telegramId} not found after upsert`,
      );
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    await this.userRepository.update(id, updateUserDto);

    return this.userRepository.findOne({
      where: { id },
    });
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    return this.userRepository.remove(user);
  }
}
