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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TracksResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_track_input_1 = require("./dto/create-track.input");
const track_entity_1 = require("./entities/track.entity");
const tracks_service_1 = require("./tracks.service");
let TracksResolver = class TracksResolver {
    constructor(tracksService) {
        this.tracksService = tracksService;
    }
    async createTrack(input) {
        return this.tracksService.create(input);
    }
    async findAll() {
        return this.tracksService.findAll();
    }
    async findOne(id) {
        return this.tracksService.findOne(id);
    }
    async updateTrack(id, input) {
        return this.tracksService.update(id, input);
    }
    async removeTrack(id) {
        return this.tracksService.remove(id);
    }
    async updateTitle(id, title) {
        return this.tracksService.updateTitle(id, title);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => track_entity_1.Track),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_track_input_1.CreateTrackInput]),
    __metadata("design:returntype", Promise)
], TracksResolver.prototype, "createTrack", null);
__decorate([
    (0, graphql_1.Query)(() => [track_entity_1.Track], { name: 'tracks' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TracksResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => track_entity_1.Track, { name: 'track' }),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TracksResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => track_entity_1.Track),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_track_input_1.CreateTrackInput]),
    __metadata("design:returntype", Promise)
], TracksResolver.prototype, "updateTrack", null);
__decorate([
    (0, graphql_1.Mutation)(() => track_entity_1.Track),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TracksResolver.prototype, "removeTrack", null);
__decorate([
    (0, graphql_1.Mutation)(() => track_entity_1.Track),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TracksResolver.prototype, "updateTitle", null);
TracksResolver = __decorate([
    (0, graphql_1.Resolver)(() => track_entity_1.Track),
    __metadata("design:paramtypes", [tracks_service_1.TracksService])
], TracksResolver);
exports.TracksResolver = TracksResolver;
//# sourceMappingURL=tracks.resolver.js.map