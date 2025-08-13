// src/common/guards/permission.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredPermissions) return true;
    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.role || !user.role.permissions) {
      throw new ForbiddenException('Insufficient permissions');
    }
    const userPerms = user.role.permissions.map((p: any) => p.name);
    if (!requiredPermissions.every((perm) => userPerms.includes(perm))) {
      throw new ForbiddenException('Insufficient permissions');
    }
    return true;
  }
}
