"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const helmet_1 = require("helmet");
const compression = require("compression");
const prisma_helper_1 = require("./adapters/database/helpers/prisma.helper");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const dotenv_1 = require("dotenv");
const serverless_express_1 = require("@vendia/serverless-express");
(0, dotenv_1.config)();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.enableCors();
    app.use((0, helmet_1.default)());
    app.use(compression());
    app.get(prisma_helper_1.PrismaHelper, { strict: false });
    app.enableShutdownHooks();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Lanchonete Auth API')
        .setDescription('API de Autenticação para a lanchonete')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('v1/doc', app, document);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidUnknownValues: true,
        forbidNonWhitelisted: true,
    }));
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    await app.listen(process.env.PORT || 3002);
    async function gracefulShutdown(signal) {
        await app.close();
        process.kill(process.pid, signal);
    }
    process.on('SIGINT', gracefulShutdown);
}
bootstrap();
let cachedServer;
const handler = async (event, context) => {
    if (!cachedServer) {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors();
        app.use((0, helmet_1.default)());
        app.use(compression());
        app.get(prisma_helper_1.PrismaHelper, { strict: false });
        app.enableShutdownHooks();
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Lanchonete Auth API')
            .setDescription('API de Autenticação para a lanchonete')
            .setVersion('1.0')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('v1/doc', app, document);
        app.useGlobalPipes(new common_1.ValidationPipe({
            transform: true,
            whitelist: true,
            forbidUnknownValues: true,
            forbidNonWhitelisted: true,
        }));
        (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
        await app.init();
        cachedServer = (0, serverless_express_1.configure)({
            app: app.getHttpAdapter().getInstance(),
        });
        async function gracefulShutdown(signal) {
            await app.close();
            process.kill(process.pid, signal);
        }
        process.on('SIGINT', gracefulShutdown);
    }
    return cachedServer(event, context);
};
exports.handler = handler;
//# sourceMappingURL=main.js.map