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
exports.UpdateTrackTitle = exports.UpdateTrackInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_track_input_1 = require("./create-track.input");
let UpdateTrackInput = class UpdateTrackInput extends (0, graphql_1.PartialType)(create_track_input_1.CreateTrackInput) {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateTrackInput.prototype, "id", void 0);
UpdateTrackInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateTrackInput);
exports.UpdateTrackInput = UpdateTrackInput;
let UpdateTrackTitle = class UpdateTrackTitle extends (0, graphql_1.PartialType)(create_track_input_1.CreateTrackInput) {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateTrackTitle.prototype, "id", void 0);
UpdateTrackTitle = __decorate([
    (0, graphql_1.InputType)()
], UpdateTrackTitle);
exports.UpdateTrackTitle = UpdateTrackTitle;
//# sourceMappingURL=update-track.input.js.map