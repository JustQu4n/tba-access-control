// src/roles/roles.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../database/entities/role.entity';
import { Permission } from '../database/entities/permission.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    @InjectRepository(Permission) private permRepo: Repository<Permission>,
  ) {}

  async findAll() {
    return this.roleRepo.find({ relations: ['permissions'] });
  }

  async create(data: { name: string; description?: string; permissions?: number[] }) {
    const exist = await this.roleRepo.findOne({ where: { name: data.name } });
    if (exist) throw new ForbiddenException('Role already exists');
    let permissions: Permission[] = [];
    if (data.permissions && data.permissions.length) {
      permissions = await this.permRepo.findByIds(data.permissions);
    }
    const role = this.roleRepo.create({ ...data, permissions });
    return this.roleRepo.save(role);
  }

  async update(id: number, data: Partial<{ name: string; description: string; permissions: number[] }>) {
    const role = await this.roleRepo.findOne({ where: { id }, relations: ['permissions'] });
    if (!role) throw new NotFoundException('Role not found');
    if (data.permissions) {
      role.permissions = await this.permRepo.findByIds(data.permissions);
    }
    Object.assign(role, data);
    return this.roleRepo.save(role);
  }

  async remove(id: number) {
    const role = await this.roleRepo.findOne({ where: { id } });
    if (!role) throw new NotFoundException('Role not found');
    return this.roleRepo.remove(role);
  }
}
