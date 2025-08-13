// src/roles/roles.controller.ts
import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PermissionGuard } from 'src/common/guards/permission.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Permissions } from 'src/common/decorators/permissions.decorator';

@Controller('roles')
@UseGuards(JwtAuthGuard, RoleGuard, PermissionGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @Roles('Admin', 'SuperAdmin')
  @Permissions('role.read')
  findAll() {
    return this.rolesService.findAll();
  }

  @Post()
  @Roles('SuperAdmin')
  @Permissions('role.create')
  create(@Body() body: CreateRoleDto) {
    return this.rolesService.create(body);
  }

  @Patch(':id')
  @Roles('SuperAdmin')
  @Permissions('role.update')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateRoleDto) {
    return this.rolesService.update(id, body);
  }

  @Delete(':id')
  @Roles('SuperAdmin')
  @Permissions('role.delete')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.remove(id);
  }
}
