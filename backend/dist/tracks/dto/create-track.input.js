"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTrackInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let CreateTrackInput = class CreateTrackInput {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateTrackInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateTrackInput.prototype, "url", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateTrackInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateTrackInput.prototype, "artist", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateTrackInput.prototype, "artwork", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateTrackInput.prototype, "album", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateTrackInput.prototype, "duration", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateTrackInput.prototype, "image", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [String]),
    __metadata("design:type", Array)
], CreateTrackInput.prototype, "category", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [String]),
    __metadata("design:type", Array)
], CreateTrackInput.prototype, "type", void 0);
CreateTrackInput = __decorate([
    (0, graphql_1.InputType)()
], CreateTrackInput);
exports.CreateTrackInput = CreateTrackInput;
//# sourceMappingURL=create-track.input.js.map