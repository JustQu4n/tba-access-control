// src/permissions/dto/update-permission.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class UpdatePermissionDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
