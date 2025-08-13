// src/database/entities/role-permission.entity.ts
import { Entity, PrimaryColumn } from 'typeorm';

@Entity('role_permissions')
export class RolePermission {
  @PrimaryColumn()
  role_id: number;

  @PrimaryColumn()
  permission_id: number;
}
