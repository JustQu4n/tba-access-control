// src/permissions/dto/create-permission.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
