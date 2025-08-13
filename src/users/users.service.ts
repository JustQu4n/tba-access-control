// src/users/users.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { Role } from '../database/entities/role.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
  ) {}

  async findAll() {
    return this.userRepo.find({ relations: ['role'] });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id }, relations: ['role'] });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create(data: { username: string; email: string; password: string; role?: string }) {
    const exist = await this.userRepo.findOne({ where: [{ username: data.username }, { email: data.email }] });
    if (exist) throw new ForbiddenException('Username or email already exists');
    const hash = await bcrypt.hash(data.password, 10);
    let role: Role | undefined;
    if (data.role) {
      role = await this.roleRepo.findOne({ where: { name: data.role } }) || undefined;
    } else {
      role = await this.roleRepo.findOne({ where: { name: 'User' } }) || undefined;
    }
    if (!role) throw new ForbiddenException('Role not found');
    const user = this.userRepo.create({ ...data, password: hash, role });
    return this.userRepo.save(user);
  }

  async update(id: number, data: Partial<{ username: string; email: string; password: string; role?: string }>) {
    const user = await this.findOne(id);
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    if (data.role) {
      const role = await this.roleRepo.findOne({ where: { name: data.role } });
      if (role) user.role = role;
    }
    Object.assign(user, data);
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.userRepo.remove(user);
  }
}
