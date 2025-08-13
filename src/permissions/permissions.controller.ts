// src/permissions/permissions.controller.ts
import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PermissionGuard } from 'src/common/guards/permission.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Permissions } from 'src/common/decorators/permissions.decorator';

@Controller('permissions')
@UseGuards(JwtAuthGuard, RoleGuard, PermissionGuard)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  @Roles('Admin', 'SuperAdmin')
  @Permissions('permission.read')
  findAll() {
    return this.permissionsService.findAll();
  }

  @Post()
  @Roles('SuperAdmin')
  @Permissions('permission.create')
  create(@Body() body: CreatePermissionDto) {
    return this.permissionsService.create(body);
  }

  @Patch(':id')
  @Roles('SuperAdmin')
  @Permissions('permission.update')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdatePermissionDto) {
    return this.permissionsService.update(id, body);
  }

  @Delete(':id')
  @Roles('SuperAdmin')
  @Permissions('permission.delete')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.permissionsService.remove(id);
  }
}
