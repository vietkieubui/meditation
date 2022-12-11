"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const guards_1 = require("./common/guards");
const socketio_adapter_1 = require("./gateway/socketio.adapter");
const HOST = process.env.IP_ADDRESS;
const PORT = 3001;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ forbidNonWhitelisted: true }));
    app.useGlobalGuards(new guards_1.JwtAuthGuard(new core_1.Reflector()));
    app.useWebSocketAdapter(new socketio_adapter_1.SocketIoAdapter(app));
    await app.listen(PORT, HOST, () => {
        console.log(`Listening on http://${HOST}:${PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map