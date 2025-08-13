import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1691836800000 implements MigrationInterface {
    name = 'InitSchema1691836800000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE roles (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE,
            description VARCHAR(255)
        ) ENGINE=InnoDB`);

        await queryRunner.query(`CREATE TABLE permissions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE,
            description VARCHAR(255)
        ) ENGINE=InnoDB`);

        await queryRunner.query(`CREATE TABLE users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL UNIQUE,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role_id INT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            CONSTRAINT FK_user_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL
        ) ENGINE=InnoDB`);

        await queryRunner.query(`CREATE TABLE role_permissions (
            role_id INT NOT NULL,
            permission_id INT NOT NULL,
            PRIMARY KEY (role_id, permission_id),
            CONSTRAINT FK_role_permission_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
            CONSTRAINT FK_role_permission_permission FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
        ) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS role_permissions`);
        await queryRunner.query(`DROP TABLE IF EXISTS users`);
        await queryRunner.query(`DROP TABLE IF EXISTS permissions`);
        await queryRunner.query(`DROP TABLE IF EXISTS roles`);
    }
}
