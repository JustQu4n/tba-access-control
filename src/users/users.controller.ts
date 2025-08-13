// src/users/users.controller.ts
import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Permissions } from '../common/decorators/permissions.decorator';
import { RoleGuard } from '../common/guards/role.guard';
import { PermissionGuard } from '../common/guards/permission.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('Admin', 'SuperAdmin')
  @UseGuards(RoleGuard)
  @Permissions('user.read')
  @UseGuards(PermissionGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles('Admin', 'SuperAdmin')
  @UseGuards(RoleGuard)
  @Permissions('user.read')
  @UseGuards(PermissionGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  @Roles('Admin', 'SuperAdmin')
  @UseGuards(RoleGuard)
  @Permissions('user.create')
  @UseGuards(PermissionGuard)
  create(@Body() body: { username: string; email: string; password: string; role?: string }) {
    return this.usersService.create(body);
  }

  @Patch(':id')
  @Roles('Admin', 'SuperAdmin')
  @UseGuards(RoleGuard)
  @Permissions('user.update')
  @UseGuards(PermissionGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() body: Partial<{ username: string; email: string; password: string; role?: string }>) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  @Roles('Admin', 'SuperAdmin')
  @UseGuards(RoleGuard)
  @Permissions('user.delete')
  @UseGuards(PermissionGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
