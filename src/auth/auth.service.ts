// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { Role } from '../database/entities/role.entity';
import { Permission } from '../database/entities/permission.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    @InjectRepository(Permission) private permRepo: Repository<Permission>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { username }, relations: ['role'] });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(user: User) {
    const payload = { sub: user.id, username: user.username, role: user.role?.name };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }),
      user: { id: user.id, username: user.username, email: user.email, role: user.role?.name },
    };
  }

  async register(data: { username: string; email: string; password: string; role?: string }) {
    const exist = await this.userRepo.findOne({ where: [{ username: data.username }, { email: data.email }] });
    if (exist) throw new BadRequestException('Username or email already exists');
    const hash = await bcrypt.hash(data.password, 10);
    let role: Role | undefined;
    if (data.role) {
      role = await this.roleRepo.findOne({ where: { name: data.role } }) || undefined;
    } else {
      role = await this.roleRepo.findOne({ where: { name: 'User' } }) || undefined;
    }
    if (!role) throw new BadRequestException('Role not found');
    const user = this.userRepo.create({ ...data, password: hash, role });
    await this.userRepo.save(user);
    return this.login(user);
  }

  async refresh(token: string) {
    try {
      const payload = this.jwtService.verify(token, { secret: process.env.JWT_REFRESH_SECRET });
      const user = await this.userRepo.findOne({ where: { id: payload.sub }, relations: ['role'] });
      if (!user) throw new UnauthorizedException();
      return this.login(user);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
