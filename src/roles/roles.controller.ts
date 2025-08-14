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
import { AssignPermissionsDto } from './dto/assign-permission.dto';

@Controller('roles')
@UseGuards(JwtAuthGuard, RoleGuard, PermissionGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @Roles('Admin', 'SuperAdmin')
  @Permissions('read')
  findAll() {
    return this.rolesService.findAll();
  }

  @Post()
  @Roles('SuperAdmin')
  @Permissions('create')
  create(@Body() body: CreateRoleDto) {
    return this.rolesService.create(body);
  }

  @Patch(':id')
  @Roles('SuperAdmin')
  @Permissions('update')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateRoleDto) {
    return this.rolesService.update(id, body);
  }

  @Delete(':id')
  @Roles('SuperAdmin')
  @Permissions('delete')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.remove(id);
  }

  @Post('assign-permissions')
  @Roles('SuperAdmin')
  @Permissions('assign_role')
  assignPermissions(@Body() body: AssignPermissionsDto) {
    return this.rolesService.assignPermissions(body.roleId, body.permissionIds);
  }
}
