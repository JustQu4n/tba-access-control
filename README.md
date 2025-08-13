<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
# tba-access-control

# TBA Access Control (RBAC)

Hệ thống quản lý người dùng & phân quyền (RBAC) sử dụng NestJS + TypeORM + MySQL.

## 🛠️ Yêu cầu
- Node.js >= 18
- MySQL >= 5.7

## 🚀 Cài đặt
```bash
# Cài dependencies
npm install

# Copy file cấu hình mẫu
cp .env.example .env
# Hoặc tự tạo file .env với nội dung:
# DB_HOST=localhost
# DB_PORT=3306
# DB_USERNAME=root
# DB_PASSWORD=your_password
# DB_DATABASE=tba_access_control
# JWT_ACCESS_SECRET=your_access_secret
# JWT_REFRESH_SECRET=your_refresh_secret
# ...
```

## ⚡ Khởi tạo database
- Tạo database thủ công trên MySQL:
  ```sql
  CREATE DATABASE tba_access_control CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  ```
- **Hoặc** dùng script tự động (nên dùng):
  ```bash
  npm run prestart # (nếu đã cấu hình script tự động tạo DB)
  ```

## 🗄️ Migration
- Tạo bảng tự động bằng migration:
  ```bash
  npm run migration:run
  ```
- Tạo migration mới từ entity:
  ```bash
  npm run migration:generate
  ```

## 🌱 Seed dữ liệu mẫu
```bash
npx ts-node src/database/seed.ts
# Hoặc nếu có script:
npm run seed
```
- Tài khoản mặc định:
  - Username: `superadmin`
  - Password: `superadmin`

## 🏃 Chạy ứng dụng
```bash
npm run start:dev
```
- Truy cập: http://localhost:3000

## 📚 API Endpoints
- Auth:
  - POST `/auth/register`
  - POST `/auth/login`
  - POST `/auth/refresh`
- Users:
  - GET `/users`
  - GET `/users/:id`
  - POST `/users`
  - PATCH `/users/:id`
  - DELETE `/users/:id`
- Roles:
  - GET `/roles`
  - POST `/roles`
  - PATCH `/roles/:id`
  - DELETE `/roles/:id`
- Permissions:
  - GET `/permissions`
  - POST `/permissions`
  - PATCH `/permissions/:id`
  - DELETE `/permissions/:id`

## 🔒 Bảo mật
- Helmet, CORS, Rate limiting
- Middleware log request
- Validation: class-validator + class-transformer

## 📝 Ghi chú
- Để đổi secret JWT, sửa trong file `.env`.
- Để thêm quyền, role, hãy seed lại hoặc dùng API.
- Để tự động tạo database, có thể dùng script NodeJS trước khi start app.

## 📂 Cấu trúc thư mục
```
├── src/
│   ├── auth/
│   ├── users/
│   ├── roles/
│   ├── permissions/
│   ├── common/
│   └── database/
├── .env.example
├── package.json
└── README.md
```

---

> Mọi thắc mắc vui lòng liên hệ quản trị dự án.
