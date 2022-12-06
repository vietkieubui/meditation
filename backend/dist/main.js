"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const HOST = '192.168.31.222';
const PORT = 3001;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(PORT, HOST, () => {
        console.log(`Listening on http://${HOST}:${PORT}`);
        console.log(`Graphql running on http://${HOST}:${PORT}/graphql`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map