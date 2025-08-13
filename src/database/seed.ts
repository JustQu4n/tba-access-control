// src/database/seed.ts
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();

import { createConnection } from 'typeorm';

async function seed() {
  const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User, Role, Permission],
  });
  await dataSource.initialize();

  // Seed roles
  const roleRepo = dataSource.getRepository(Role);
  const roles = [
    { name: 'SuperAdmin', description: 'Super admin, full permission' },
    { name: 'Admin', description: 'Admin, manage users' },
    { name: 'Manager', description: 'Manager, manage some resources' },
    { name: 'User', description: 'Normal user' },
  ];
  for (const r of roles) {
    let role = await roleRepo.findOneBy({ name: r.name });
    if (!role) {
      role = roleRepo.create(r);
      await roleRepo.save(role);
    }
  }

  // Seed permissions (ví dụ)
  const permissionRepo = dataSource.getRepository(Permission);
  const permissions = [
    { name: 'user.create', description: 'Create user' },
    { name: 'user.read', description: 'Read user' },
    { name: 'user.update', description: 'Update user' },
    { name: 'user.delete', description: 'Delete user' },
    { name: 'role.create', description: 'Create role' },
    { name: 'role.read', description: 'Read role' },
    { name: 'role.update', description: 'Update role' },
    { name: 'role.delete', description: 'Delete role' },
    { name: 'permission.create', description: 'Create permission' },
    { name: 'permission.read', description: 'Read permission' },
    { name: 'permission.update', description: 'Update permission' },
    { name: 'permission.delete', description: 'Delete permission' },
  ];
  for (const p of permissions) {
    let perm = await permissionRepo.findOneBy({ name: p.name });
    if (!perm) {
      perm = permissionRepo.create(p);
      await permissionRepo.save(perm);
    }
  }

  // Gán full quyền cho SuperAdmin
  const superAdmin = await roleRepo.findOne({ where: { name: 'SuperAdmin' }, relations: ['permissions'] });
  const allPerms = await permissionRepo.find();
  if (superAdmin) {
    superAdmin.permissions = allPerms;
    await roleRepo.save(superAdmin);
  }

  // Tạo user SuperAdmin mặc định
  const userRepo = dataSource.getRepository(User);
  let adminUser = await userRepo.findOneBy({ username: 'superadmin' });
  if (!adminUser) {
    const hash = await bcrypt.hash('superadmin', 10);
    if (!superAdmin) throw new Error('SuperAdmin role not found');
    adminUser = userRepo.create({
      username: 'superadmin',
      email: 'superadmin@example.com',
      password: hash,
      role: superAdmin,
    });
    await userRepo.save(adminUser);
  }

  await dataSource.destroy();
  console.log('Seed data completed!');
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
