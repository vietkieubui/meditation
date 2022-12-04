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
exports.TracksSchema = exports.Tracks = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Tracks = class Tracks {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Tracks.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Tracks.prototype, "url", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Tracks.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Tracks.prototype, "artist", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Tracks.prototype, "artwork", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Tracks.prototype, "album", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Tracks.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Tracks.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)((type) => [String]),
    __metadata("design:type", Array)
], Tracks.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)((type) => [String]),
    __metadata("design:type", Array)
], Tracks.prototype, "type", void 0);
Tracks = __decorate([
    (0, mongoose_1.Schema)()
], Tracks);
exports.Tracks = Tracks;
exports.TracksSchema = mongoose_1.SchemaFactory.createForClass(Tracks);
//# sourceMappingURL=tracks.schema.js.map