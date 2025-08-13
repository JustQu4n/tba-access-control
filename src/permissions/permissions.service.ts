// src/permissions/permissions.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../database/entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission) private permRepo: Repository<Permission>,
  ) {}

  async findAll() {
    return this.permRepo.find();
  }

  async create(data: { name: string; description?: string }) {
    const exist = await this.permRepo.findOne({ where: { name: data.name } });
    if (exist) throw new ForbiddenException('Permission already exists');
    const perm = this.permRepo.create(data);
    return this.permRepo.save(perm);
  }

  async update(id: number, data: Partial<{ name: string; description: string }>) {
    const perm = await this.permRepo.findOne({ where: { id } });
    if (!perm) throw new NotFoundException('Permission not found');
    Object.assign(perm, data);
    return this.permRepo.save(perm);
  }

  async remove(id: number) {
    const perm = await this.permRepo.findOne({ where: { id } });
    if (!perm) throw new NotFoundException('Permission not found');
    return this.permRepo.remove(perm);
  }
}
